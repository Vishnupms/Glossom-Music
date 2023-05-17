import React, { useEffect, useState } from 'react'
import Player from '../../MusicPlayer/Player'
import Sidebar from '../Sidebar'
import {AiOutlineEdit,AiOutlineSave} from 'react-icons/ai'
import { Toaster, toast } from 'react-hot-toast'
import PlaylistCard2 from '../Cards/PlaylistImage'
import { getAllPlaylist } from '../../../Api/Api'
import Layout from '../../../pages/User/Layout'



function CreatePlaylist() {


  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(null);
  const [playtlist,setPlaylist]= useState("")
  const [addSong, setAddSong] = useState("");

  
  useEffect(() => {
    async function invoke() {
      const data = await getAllPlaylist();
      if (data.success === false) {
      } else {
        setEditedName(data.data[0].title)
        

      }
    }
    invoke();
  }, []);

  const handleSave = () => {
    // Save the edited name and exit edit mod
   
    setEditing(false);
  };



  const handleCancel = () => {
    // Discard the changes and exit edit mode
   
    setEditing(false);
  };


  

  return (

     <Layout>
      <div className="px-6 h-[calc(100vh)]  hide-scrollbar flex xl:flex-row flex-col-reverse">
      <div className="mt-28 flex-1 h-50  ">

      <div className="relative">

      <div className="ml-20 -mt-20 w-40 h-40 absolute ">
        <label htmlFor="file-input">
   {/* <PlaylistCard2 /> */}
        </label>
        <input id="file-input" type="file" accept="image/*" className="hidden"  />
      </div>
      
    </div>


      <div className=" text-center -mt-14 border-b pb-10  flex flex-col items-center">
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
    </div>
  
    <div className="mt-2 overflow-y-hidden" >

</div>


 
      </div>
  
      </div>
    
      </Layout> 
  )
}

export default CreatePlaylist