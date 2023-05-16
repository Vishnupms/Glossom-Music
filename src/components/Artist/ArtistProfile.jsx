import React, { useState } from 'react'
import ArtistSidebar from './ArtistSidebar'
import { useSelector } from 'react-redux'
import {AiOutlineEdit,AiOutlineSave} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { userActions } from '../../redux/Slice/UserSlice'
import { Toaster, toast } from 'react-hot-toast'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../config/firebase.config'
import ArtistLayout from '../../pages/Artist/ArtistLayout'
import ArtistInstance from '../../Axios/ArtistInstance'
import { artistActions } from '../../redux/Slice/ArtistSlice'

function ArtistProfile() {

  const dispatch = useDispatch()
  const name = useSelector((state)=>state?.artist?.name)
  const {email,id,imgURL} = useSelector((state)=>state?.artist)
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [photo,setPhoto] = useState(imgURL)



  const handleSave = async () => {
    // Save the edited name and exit edit mode
    if (editedName) {
     
      await ArtistInstance.post(`/artist/update-artist-profile/${id}`, {
        editedName,
      }).then((response) => {
        console.log(response?.data?.profile?.username);
        

        if (response?.data?.success) {
          
        
            toast.success(response?.data?.message)
          }
      });
    }
   
    setEditing(false);
  };
  // dispatch(
  //   artistActions.setArtistName({
  //     name: editedName
  //   })

  //   );


  const handleCancel = () => {
    // Discard the changes and exit edit mode
    setEditedName(name);
    setEditing(false);
  };

  const handleImgUpload = (file) => {
    if (file == null) {
      return;
    }
    const imageref = ref(storage, `/profile/${file.name}`);
    const uploadtask = uploadBytesResumable(imageref, file);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setPhoto(downloadURL)
          ArtistInstance.post(`/artist/update-artist-profile/${id}`, {
            imageUrl:downloadURL
          }).then((response) => {
            console.log(response?.data?.profile,"scsc");})
          toast.success("Photo updated successfully")
        });
      }
    );
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.onload = () => {
          handleImgUpload(file);
        };
        img.src = reader?.result;
      };
      reader.readAsDataURL(file);
    }
  };


  
  return (
<ArtistLayout>

    <div className="px-6 h-[calc(100vh)]  hide-scrollbar flex xl:flex-row flex-col-reverse">
    <div className="mt-28 flex-1 h-50  ">

    <div className="relative">

    <div className="w-36 h-36 bg-indigo-100 mx-auto shadow-2xl absolute inset-x-0 top-0 -mt-20 flex items-center justify-center text-indigo-500 rounded-full">
      <label htmlFor="file-input">
        {photo?photo && <img  src={photo} alt="Profile photo" className="absolute inset-x-0 top-0 mx-auto cursor-pointer w-36 h-36 rounded-full border-4 border-white" />:<svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>}
        
      </label>
      <input id="file-input" type="file" accept="image/*"  className="hidden" onChange={handleFileInputChange} />
    </div>
    
  </div>


    <div className="md:mt-20 mt-20 text-center border-b pb-10 flex flex-col items-center">
    {editing ? (
      // Show the text field when editing is true
      <div className="flex items-center">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="mr-2 px-2 py-1  border border-gray-400 rounded"
        />
        <button
          onClick={()=>{handleSave()}}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    ) : (
      // Show the name and edit icon when editing is false
      <h1
        className="text-4xl font-medium text-gray-400 flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {editedName}
        {hovered && (
          <AiOutlineEdit
            className="ml-2 cursor-pointer"
            onClick={() => setEditing(true)}
          />
        )}
      </h1>
    )}
    <div className=''>
    <p className="mt-2 text-gray-500">{email}</p>
    </div>
  </div>
    </div>

    </div>
    </ArtistLayout>

  )
}

export default ArtistProfile