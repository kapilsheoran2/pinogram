
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Login({users,setIsLoggedin,setLoggedUser}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const data = {};
  
    formData.forEach((value, key) => {
      data[key] = value;
    });

    
  
    try {
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users/login`, data);

      console.log(response);
      
      const { token, user } = response.data;
      console.log(token,user);
      
  
      // Store the token in localStorage
      localStorage.setItem("token", token);
  
      // Update state
      setLoggedUser(user);
      setIsLoggedin(true);
  
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      setIsLoggedin(false);
    }
  };
  

  
  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <p className="text-sm font-light text-gray-500">
                      Don’t have an account yet?
                    </p>
                  </div>
                  <NavLink
                    to="/signup"
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Signup
                  </NavLink>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Signin
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}