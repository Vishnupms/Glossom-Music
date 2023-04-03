  import React, { useState } from 'react'
  import Player from './MusicPlayer/Player'
  import Sidebar from './Sidebar'
  import { useSelector } from 'react-redux'
  import {AiOutlineEdit,AiOutlineSave} from 'react-icons/ai'
  import Instance from '../Axios/Instance'
  import { useDispatch } from 'react-redux'
import { userActions } from '../redux/Slice/UserSlice'
import { Toaster, toast } from 'react-hot-toast'




  function Profile() {
    const {name,id,email} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [hovered, setHovered] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [photoUrl, setPhotoUrl] = useState('');
  

    const handleSave = async () => {
      // Save the edited name and exit edit mode
      if (editedName) {
       
        await Instance.post(`/user/updateProfile/${id}`, {
          editedName,
        }).then((response) => {
          console.log(response);

          if (response.data.success) {
            toast.success(response.data.message)
            
            dispatch(
              userActions.setUserName({
                user:"user",
                name:editedName
              })

            );
          }
        });
      }
     
      setEditing(false);
    };
  
  
  
    const handleCancel = () => {
      // Discard the changes and exit edit mode
      setEditedName(name);
      setEditing(false);
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    };
  
    
    return (
      <div className="relative flex mx-auto ">
      <Sidebar />
      <Toaster position="top-center"></Toaster>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">

      <div className="px-6 h-[calc(100vh)]  hide-scrollbar flex xl:flex-row flex-col-reverse">
      <div className="mt-28 flex-1 h-50  ">

      <div className="relative">

      <div className="w-40 h-40 bg-indigo-100 mx-auto shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 rounded-full">
        <label htmlFor="file-input">
          {photoUrl?photoUrl && <img  src={photoUrl} alt="Profile photo" className="absolute inset-x-0 top-0 mx-auto  w-40 h-40 rounded-full border-4 border-white" />:<svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>}
          
        </label>
        <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
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
      </div>
      <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <Player />
          </div>
      </div>

    )
  }

  export default Profile