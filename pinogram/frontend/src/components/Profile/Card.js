import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp, FaThumbsDown, FaComment, FaTrash } from "react-icons/fa";
import CommentModal from "../commentModal";

export default function Card({count, post, index, setCount, loggedUser, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const openCommentModal = (post) => {
    setIsModalOpen(true);
    setSelectedPost(post);
  };

  const closeCommentModal = () => {
    setIsModalOpen(false);
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const handleLike = async () => {
    try {
      const response = await axios.put(`${API_URL}posts/like/?postId=${post._id}&userId=${loggedUser._id}`);
      if (response) {
        setCount((count) => count + 1);
        toast.success(response.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data, {
          position: "bottom-center",
        });
      } else {
        toast.error("Network Error", {
          position: "bottom-center",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}posts/delete/?postId=${post._id}&userId=${loggedUser._id}`);

      if (response) {
        setCount((count) => count + 1);
        toast.success(response.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data, {
          position: "bottom-center",
        });
      } else {
        toast.error("Network Error", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <div
        key={index}
        className="overflow-hidden bg-gray-50 rounded-lg shadow-lg"
      >
        {post.user.username ? (
          <div className="mx-4 my-1 flex items-center ">
            <img
              src={post.user.dp}
              className="w-10 h-10 object-cover rounded-full"
              alt=""
            />
            <strong className="mx-3">{post.user.username}</strong>
          </div>
        ) : (
          <div className="mx-4 my-1 flex items-center ">
            <img
              src={user.dp}
              className="w-10 h-10 object-cover rounded-full"
              alt=""
            />
            <strong className="mx-3">{user.username}</strong>
          </div>
        )}
        <img
          src={post.image}
          alt={post.caption}
          className="w-full object-cover"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.caption}</div>
          <p className="text-gray-700 text-base">
            Created at {new Date(post.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700 text-base">Likes: {post.likes.length}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleLike}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {post.likes.includes(loggedUser._id) ? (
                <>
                  <FaThumbsDown className="mr-2" />
                  Dislike
                </>
              ) : (
                <>
                  <FaThumbsUp className="mr-2" />
                  Like
                </>
              )}
            </button>

            <button
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={()=>openCommentModal(post)}
            >
              <FaComment className="mr-2" /> Comment
            </button>
            {post.user === loggedUser._id && (
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            )}
            <CommentModal count={count} setSelectedPost={setSelectedPost} setCount={setCount} loggedUser={loggedUser} isOpen={isModalOpen} selectedPost={selectedPost} onClose={closeCommentModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
