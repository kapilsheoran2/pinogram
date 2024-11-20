import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamation } from "react-icons/fa";

export default function Upload({ setCount, loggedUser, setShowUploadModal }) {

  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);


  const handleImageUpload = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "gbxinum8");
      formData.append("cloud_name", "pinorama");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pinorama/image/upload",
        formData
      );

      if (response.data && response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl);

        const postData = {
          image: imageUrl,
          caption: caption,
          id: loggedUser._id,
        };

        try {
          await axios.post(API_URL + "posts", postData);
          toast.success("Post uploaded", { position: "bottom-center" });
          setCount((count) => count + 1);
        } catch (error) {
          toast.error("Upload unsuccessful", { position: "bottom-center" });
        }

        setSelectedFile(null);
        setCaption("");
        setShowUploadModal(false);
      } else {
        console.error("Error uploading image: No secure URL found in response");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  return (
    <>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaExclamation />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Upload Image
                  </h3>
                  <div className="my-2 pt-3  flex flex-col  justify-center items-center border-2 border-red-100 border-dashed rounded-md">
                    <label className="block  text-sm font-medium text-gray-700">
                      <span className="hover:text-red-500 poin">Upload a file</span>
                      <input
                        id="fileInput"
                        name="fileInput"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <div className="mb-4">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="max-w-full h-auto mx-auto mt-2 rounded-md"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={caption}
                    onChange={handleCaptionChange}
                    placeholder="Enter caption"
                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    required
                  />
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold mt-2 py-2 px-4 rounded w-full"
                    onClick={handleImageUpload}
                    disabled={!selectedFile || loading}
                  >
                    {loading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowUploadModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
