import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
export default function Search({count, user, setCount }) {


  const API_URL = `${process.env.REACT_APP_API_URL}users/`;
  const [search, setSearch] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleFetch = async (text) => {
    if (text !== "") {
      const response = await axios.get(API_URL + "search/?query=" + text);
      setSearch(response.data);
    } else {
      setSearch([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedUser) {
          const response = await axios.get(API_URL+"user/" + selectedUser._id);
          setSelectedUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching selected user:', error);
      }
    };
  
    fetchData();
  }, [count]);
  

  const handleSelectUser = (selectuser) => {
    setSelectedUser(selectuser);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full border  border-gray-300 rounded p-2 mb-4"
        onChange={(e) => {
          handleFetch(e.target.value);
        }}
      />

      <div className="grid grid-cols-3 gap-4 mb-5">
        {search.map((selectuser, index) => (
          <button
            key={index}
            className="p-4 my -4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelectUser(selectuser)}
          >
            <p className="text-lg font-semibold">{selectuser.username}</p>
            <p className="text-sm text-gray-500">{selectuser.email}</p>
          </button>
        ))} 
      </div>

      {selectedUser ?
        (selectedUser._id === user._id ? (
          <Profile count={count} setCount={setCount} loggedUser={user} user={selectedUser} />
        ) : (
          <Profile count={count} setCount={setCount} loggedUser={user} user={selectedUser} />
        )):<strong className="text-center">Search/Select to see the user profile</strong>}
    </div>
  );
}
