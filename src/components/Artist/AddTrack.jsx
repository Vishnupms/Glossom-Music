import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";

import ArtistLayout from "../../pages/Artist/ArtistLayout";
import { addTrack } from "../../Api/ArtistApi";
import { getGenre } from "../../Api/Api";

const AddTrack = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [audio, setAudio] = useState("");
  const [audioName, setAudioName] = useState("");
  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");
  const [category,setCategory] = useState('')
  const [audioProgress, setAudioProgress] = useState("");
  const [imgProgress, setImgProgress] = useState("");

  const { name, id } = useSelector((state) => state.artist);
  const [genre, setGenre] = useState([]);


  useEffect(() => {
    async function invoke() {
      const data = await getGenre();
      if (data.status === "failed") {

      } else {
        setGenre(data?.category);

      }
    }
    invoke();
  }, []);

  function handleAudioChange(e) {
    const file = e.target.files[0];
    setAudio(file);
    setAudioName(file ? file.name : "");
  }
  const handleAudioUpload = (e) => {
    e.preventDefault();
    if (audio == null) {
      return;
    }
    const audioref = ref(storage, `/songs/${audio.name}`);

    const uploadtask = uploadBytesResumable(audioref, audio);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgresspercent(progress);
        setAudioProgress(progress);

      },
      (error) => {

      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {

          setAudio(downloadURL);
        });
      }
    );
  };
  function handleImgChange(e) {
    const file = e.target.files[0];
    setImg(file);
    setImgName(file ? file.name : "");
  }
  const handleImgUpload = (e) => {
    e.preventDefault();
    if (img == null) {
      return;
    }
    const imageref = ref(storage, `/images/${img.name}`);

    const uploadtask = uploadBytesResumable(imageref, img);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgresspercent(progress);
        setImgProgress(progress);
      },
      (error) => {

      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
  
          setImg(downloadURL);
        });
      }
    );
  };

  const upload = async (datas) => {
    if (datas && img && audio) {
      try {
        const result = await addTrack(datas, img, audio, name, category);

        if (result.success) {

          toast.success(result.message)
        } else {
          toast.error(result.message);
        }
        // });
      } catch (error) {

      }
    }
  };

  return (
    <>
      <ArtistLayout>
          <Toaster position="top-center"></Toaster>
        <form onSubmit={handleSubmit(upload)}>

          <div className="mt-5 flex flex-col md:flex-row ml-5 justify-center gap-8">
            <div className="w-full md:w-1/2 max-w-md">
              <h1 className="text-2xl text-white font-bold mb-4">Add Song</h1>
              <div className="">
                <label
                  htmlFor="songName"
                  className="block text-gray-500 text-sm font-bold mb-2"
                >
                  Song Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter song name"
                  {...register("songName", {
                    required: "Fill this field",
                    maxLength: {
                      value: 20,
                      message: "Field can only contain 20 letters",
                    },
                    minLength: {
                      value: 4,
                      message: "Field should have atleast 4 characters",
                    },
                  })}
                />
                {errors?.songName && (
                  <p className="text-red-600">{errors.songName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="albumName"
                  className="block text-gray-500 text-sm font-bold mb-2"
                >
                  Album
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter album name"
                  {...register("albumName", {
                    required: "Fill this field",
                    maxLength: {
                      value: 20,
                      message: "Field can not exceed 20 characters",
                    },
                    minLength: {
                      value: 4,
                      message: "Field should be atleast 4 characters",
                    },
                  })}
                />
                {errors?.albumName && (
                  <p className="text-red-600">{errors.albumName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-500 text-sm font-bold mb-2"
                >
                  Category
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a music genre</option>
                  {genre &&
                    genre.map((gen) => {
                      return (
                        <option key={gen?._id} value={gen?.name}>
                          {gen?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-gray-500 text-sm font-bold mb-2"
                >
                  Language
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("language", {
                    required: "Fill this field",
                  })}
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Italian">Italian</option>
                </select>
                {errors?.language && (
                  <p className="text-red-600">{errors.language.message}</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 max-w-md mt-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-image"
                  className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {!imgProgress ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {imgName ? imgName : "Upload the Image file"}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <input
                    id="dropzone-image"
                    type="file"
                    className="hidden"
                    name="imgFile"
                    accept="image/*"
                    onChange={handleImgChange}
                  />
                  <div>{imgProgress ? `${imgProgress}%` : ""}</div>
                  {imgProgress == 100 ? (
                    <div className="font-bold text-black">
                      <h3 className="text-green-600">
                        Image Uploaded Successfully
                      </h3>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded "
                      onClick={handleImgUpload}
                    >
                      {imgProgress ? "Uploading..." : "Upload"}
                    </button>
                  )}
                </label>
              </div>
              {/* <label className="w-[100%] h-40 gradient-to-br from-black to-[#16e47daa] flex flex-col justify-center items-center">
              <p className="text-lg text-black text-center"></p>
              <p className="text-black">Upload the Image file </p>
              <div>
                <input
                  type="file"
                  name="imgFile"
                  accept="image/*"
                  className="w-full h-7"
                  // value={img}
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
                onClick={handleImgUpload}
              >
                Upload
              </button>
            </label> */}
              <div className="mt-1 flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {!audioProgress ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {audioName ? audioName : "Upload the Audio file"}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="audioFile"
                    accept="audio/*"
                    onChange={handleAudioChange}
                  />
                  <div>{audioProgress ? `${audioProgress}%` : ""}</div>
                  {audioProgress == 100 ? (
                    <div className="font-bold text-black">
                      <h3 className="text-green-600">
                        Song Uploaded Successfully
                      </h3>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded "
                      onClick={handleAudioUpload}
                    >
                      {audioProgress ? "Uploading..." : "Upload"}
                    </button>
                  )}
                </label>
              </div>
              {/* <div className="mt-2">
              <label className="w-[100%] h-40 bg-[#3c3d3daa] flex flex-col justify-center items-center">
                <p className="text-lg text-black text-center"></p>
                <p className="text-black">Upload the Audio file </p>
                <div>
                  <input
                    type="file"
                    name="audioFile"
                    accept="audio/*"
                    className="w-full h-7"
                    //  value={audio}
                    onChange={(e) => setAudio(e.target.files[0])}
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded "
                  onClick={handleAudioUpload}
                >
                  Upload
                </button>
              </label>
            </div> */}
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </ArtistLayout>
    </>
  );
};

export default AddTrack;
