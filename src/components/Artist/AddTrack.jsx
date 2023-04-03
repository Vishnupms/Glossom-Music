import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import Instance from "../../Axios/Instance";

const AddTrack = () => {
  const { register, handleSubmit } = useForm();
  const [audio, setAudio] = useState("");
  const [img, setImg] = useState("");
  const { name, id } = useSelector((state) => state.artist);

  const handleAudioUpload = (e) => {
    e.preventDefault();
    if (audio == null) {
      return;
    }
    const audioref = ref(storage, `/songs/${audio.name}`);
    console.log(audioref);
    const uploadtask = uploadBytesResumable(audioref, audio);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgresspercent(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setAudio(downloadURL);
        });
      }
    );
  };

  const handleImgUpload = (e) => {
    e.preventDefault();
    if (img == null) {
      return;
    }
    const imageref = ref(storage, `/images/${img.name}`);
    console.log(imageref);
    const uploadtask = uploadBytesResumable(imageref, img);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgresspercent(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImg(downloadURL);
        });
      }
    );
  };

  const upload = async (data) => {
    if (data && img && audio) {
      try {
        await Instance.post(`/artist/addtrack/${id}`, {
          data,
          img,
          audio,
          name,
        }).then((response) => {
          const result = response.data;
          if (result.success) {
            console.log(result);
            toast.success("Song uploaded successfully");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(upload)}>
        <Toaster position="top-center"></Toaster>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="w-full md:w-1/2 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Add a Song</h1>
            <div className="mb-4">
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
              {/* {errors?.songName && <p className="text-red-600">{errors.songName.message}</p>} */}
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
              {/* {errors?.albumName && <p className="text-red-600">{errors.albumName.message}</p>} */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="artistName"
                className="block text-gray-500 text-sm font-bold mb-2"
              >
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Category"
                {...register("category", {
                  required: "Fill this field",
                  maxLength: {
                    value: 20,
                    message: "Field can not exceed 20 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Field should be atleast 3 characters",
                  },
                })}
              />
              {/* {errors?.category && <p className="text-red-600">{errors.category.message}</p>} */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-gray-500 text-sm font-bold mb-2"
              >
                Language
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter language"
                {...register("language", {
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
              {/* {errors?.language && <p className="text-red-600">{errors.language.message}</p>} */}
            </div>
          </div>
          <div className="w-full md:w-1/2 max-w-md mt-8">
            <label className="w-[100%] h-40 bg-[#16e47daa] flex flex-col justify-center items-center">
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
            </label>
            <div className="mt-2">
              <label className="w-[100%] h-40 bg-[#16e47daa] flex flex-col justify-center items-center">
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
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTrack;
