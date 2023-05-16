import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Tables from "../User/Cards/Tables";
import { useSelector } from "react-redux";
import ArtistLayout from "../../pages/Artist/ArtistLayout";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import PlaylistCard2 from "../User/Cards/PlaylistImage";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import icon from "../../assets/icon.png";
import { addAlbum } from "../../Api/ArtistApi";
import './Loder.css'

function CreateAlbum() {
  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [pic,setPic] = useState('');
  const [imgURL, setImgURL] = useState("");
  const song = useSelector((state) => state.player.data);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [progress,setProgress] = useState('')
  const [loading, setLoading] = useState(false);

  const handleAddAlbum = (song) => {
    if (!selectedSongs.includes(song)) {
      setSelectedSongs([...selectedSongs, song]);
    } else {
      toast.error("song already exist");
    }
  };
  const songId = selectedSongs.map(song=>song._id)
  console.log(songId,"IDDD")
  

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(file);
      setPic(reader.result)
    };

    reader.readAsDataURL(file);
  };

  const upload = async () => {
    setLoading(true); // Set loading to true before the upload starts
    if (songId && name && imgURL) {
      if (songId.length === 0) {
        toast.error("No songs added");
        setLoading(false); // Set loading to false after the upload is complete
      } else {
        try {
          const result = await addAlbum(songId, name, imgURL);
          if (result.success) {
            toast.success("Album published successfully");
            setLoading(false); // Set loading to false after the upload is complete
          }
        } catch (error) {
          console.log(error, "Error in publishing album");
          setLoading(false); // Set loading to false after the upload is complete
        }
      }
    } else {
      setLoading(false); // Set loading to false after the upload is complete
    }
  };

  const handlePublish = async () => {
    if (!image) {
      toast.error("Add an album cover")
    }
   else{
    const imageRef = ref(storage, `/images/${image.name}`);

    // Wrap the entire uploadtask.on() method in a Promise
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error, "Error in uploading image");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log(downloadURL);
              setImgURL(downloadURL);
              resolve();
            })
            .catch((error) => {
              console.log(error, "Error in getting download URL");
              reject(error);
            });
        }
      );
    });

    try {
      await uploadPromise;
      upload();
    } catch (error) {
      console.log(error, "Error in uploading image");
      setLoading(false); // Set loading to false after the upload is complete
    }
  };
}
  
  console.log(name,"nameeee")
  return (
    <ArtistLayout>
      <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
        <div className="flex-1 h-fit pb-40">
          <div className="mt-5 relative">
            <h1 className="text-white text-2xl"> Create New Album </h1>
       
            <div className="ml-6 mt-5 w-40 h-40 absolute ">
              <label htmlFor="file-input">
                <div className="flex flex-col w-[170px] h-auto p-4 bg-white/10  backdrop-blur  rounded-lg cursor-pointer">
                  <div className="absolute  inset-0 justify-center items-center hover:bg-black/30 bg-opacity-50"></div>

                  <img
                    className="hover:scale-100"
                    src={pic ? pic : icon}
                  ></img>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>
            <input type="text" placeholder="Enter album name" className="mt-20 bg-transparent text-center text-3xl text-white border-b w-full outline-none placeholder-gray-400" onChange={(e)=>{setName(e.target.value)}}/>


          </div>
     
          <div className="mt-24 overflow-y-hidden">
            <Tables data={selectedSongs} />
          </div>
          <button onClick={handlePublish} class="relative group flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white/70 shadow-xl hover:shadow-xl transition-all duration-300">
  <span class="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-md filter blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></span>
  <span class="relative text-gray-800 font-extrabold"> {loading ? "Publishing..." : "Publish"}</span>
</button>

        </div>
        <div className="xl:sticky top-2 h-fit">
          <div className="ml-4 flex items-center justify-center pb-2 bg-transparent dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-8 text-sm text-white rounded-lg w-full bg-white/10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-base"
                placeholder="Search for songs"
              />
            </div>
          </div>

          {/* {TOP SONGS} */}
          <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-white font-bold text-xl">My Songs</h2>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                {song.map((song) => (
                  <div
                    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
                      song?.title ? "bg-[#4c426e]" : "bg-transparent"
                    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
                  >
                    <div className="flex-1 flex flex-row justify-between items-center">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={song?.imgURL}
                        alt={song?.title}
                      />
                      <div className="flex-1 flex flex-col justify-center mx-3">
                        <p className="text-lg font-bold text-white">
                          {song?.name}
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          {song?.album}
                        </p>
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-full"
                        onClick={() => {
                          handleAddAlbum(song);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
}

export default CreateAlbum;
