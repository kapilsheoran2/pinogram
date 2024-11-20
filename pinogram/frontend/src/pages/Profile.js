import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Card from "../components/Profile/Card";

export default function Profile({ user,count, loggedUser, setCount }) {
  return (
    <div className="container mx-auto p-4">
      <ProfileHeader user={user} loggedUser={loggedUser} setCount={setCount} />

      <div className="flex rounded-xl mt-32 max-h-screen justify-around">
        <div className="hidden md:flex flex-col items-center px-7 overflow-y-auto">
          <div className="p-4 rounded-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Followers: {user.followers.length} </h2>
            {user.followers.length === 0 ? (
              <p>This user has no followers yet.</p>
            ) : (
              user.followers.map((follower, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={follower.dp}
                    alt="something went wrong!!"
                    className="w-10 h-10 object-cover rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{follower.username}</p>
                    <p className="text-sm w-full text-gray-500">
                      {follower.fullname}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div
          className="flex flex-col items-center px-7 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            scrollbarColor: "transparent transparent",
          }}
        >
          {user.posts.length === 0 ? (
            <p>User hasn't posted anything yet.</p>
          ) : (
            user.posts.slice().reverse().map((post, index) => (
              <Card
                count={count}
                key={index}
                post={post}
                setCount={setCount}
                loggedUser={loggedUser}
                user={user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
