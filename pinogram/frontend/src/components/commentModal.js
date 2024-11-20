import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";

const CommentModal = ({
  isOpen,
  count,
  setCount,
  loggedUser,
  selectedPost,
  onClose,
  setSelectedPost,
}) => {
  const [comment, setComment] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    if (selectedPost._id) {
      fetchPostComments(selectedPost._id);
    }
  }, [count]);

  const fetchPostComments = async (postId) => {
    try {
      const response = await axios.get(`${API_URL}posts/post/${postId}`);

      setSelectedPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch comments", {
        position: "bottom-center",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentBody = {
      CommentText: comment,
      userId: loggedUser._id,
      postId: selectedPost._id,
    };
    try {
      const response = await axios.post(API_URL + "posts/comment", commentBody);
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

  const deleteComment = async (e, commentId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}posts/deleteComment`, {
        postId: selectedPost._id,
        commentId: commentId,
      });
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
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Leave a comment
                      </h3>

                      <div className="overflow-y-auto max-h-60">
                        {selectedPost.comments.map((comment, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 py-2 px-4 mb-2 rounded-md flex justify-between"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-start items-center">
                                <img
                                  className="w-7 h-7 object-cover rounded-full mr-2"
                                  src={comment.user.dp}
                                  alt=""
                                />
                                <b>{comment.user.username}</b>
                              </div>
                              <p className="ml-9">{comment.CommentText}</p>
                            </div>
                            <button onClick={(e)=>{deleteComment(e,comment._id)}} className="text-xl text-red-500" >
                              <RiDeleteBin4Fill />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2">
                        <textarea
                          className="w-full border border-gray-300 rounded-md p-2"
                          placeholder="Write your comment here..."
                          value={comment}
                          onChange={handleCommentChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full  items-center inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-3xl font-medium  sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <FiSend className="block py-2 pl-3 pr-4 text-blue-400 md:hover:text-blue-600 md:p-0 " />
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
