import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Profile/Card";

export default function Home({ users, count, loggedUser, setCount }) {
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(API_URL + "posts");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, [count]);

  return (
    <div className="flex justify-center max-h-screen">
      <div className="hidden md:flex flex-col items-center px-7 overflow-y-auto">
        <div className="p-4 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {users.map((user, index) => (
            <div key={index} className="flex items-center mb-2">
              <img
                src={user.dp}
                alt="something went wrong!!"
                className="w-10 h-10 object-cover rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm w-full text-gray-500">
                  Search this user for more content
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex flex-col items-center px-7 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          scrollbarColor: "transparent transparent",
        }}
      >
        {posts.slice().reverse().map((post, index) => (
            <Card
              key={index}
              post={post}
              setCount={setCount}
              loggedUser={loggedUser}
              count={count}
            />
          ))}
      </div>

      <div className="hidden md:flex flex-col items-center">
        <div className="p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Featured Content</h2>
          <div className="mb-4">
            <img
              src="https://res.cloudinary.com/pinorama/image/upload/v1708439681/jq5n3p8ftbrrnggarwyk.jpg"
              alt="Featured"
              className="w-full h-52 rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-700">
            Discover our featured content and explore more.
          </p>
        </div>
        <div className="p-4 rounded-lg">
          <div className="mb-4">
            <img
              src="https://res.cloudinary.com/pinorama/image/upload/v1707798820/hunbq7hhnds4o39jgllq.jpg"
              alt="Featured"
              className="w-full h-52 rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-700">
            Discover our featured content and explore more.
          </p>
        </div>
      </div>
    </div>
  );
}
