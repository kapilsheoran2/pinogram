import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(1);
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const API_URL = `${process.env.REACT_APP_API_URL}users`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);

        
        const Token = await JSON.parse(localStorage.getItem('token'))
        if(Token){
          const userEmail = Token.email;
          const userPassword = Token.password;

          const user = await fetchedUsers.find(user => user.email === userEmail && user.password === userPassword);
          if(user){
            setIsLoggedin(true);
            setLoggedUser(user)
          }else{
            setIsLoggedin(false)
          }
        }
        

        if (count > 1) {
          const userExists = await fetchedUsers.find(
            (user) => user.username === loggedUser.username
          );
          if (userExists) {
            setLoggedUser(userExists);
          }
          setIsLoggedin(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [count, loggedUser.username]);

  const handleLogout = () =>{
    localStorage.removeItem('token');
    setIsLoggedin(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header  handleLogout={handleLogout}/>
        <div className="md:mt-20 mt-40">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedin ? (
                <Navigate to="/home" />
              ) : (
                <Login
                  users={users}
                  setIsLoggedin={setIsLoggedin}
                  setLoggedUser={setLoggedUser}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedin ? (
                <Profile user={loggedUser} count={count} loggedUser={loggedUser} setCount={setCount}/>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/signup" element={<Register setCount={setCount} />} />
          <Route
            path="/home"
            element={isLoggedin ? <Home users={users} setCount={setCount} count={count} loggedUser={loggedUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={isLoggedin ? <Search user={loggedUser} count={count} setCount={setCount} /> : <Navigate to="/" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;