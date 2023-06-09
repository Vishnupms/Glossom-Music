import React from 'react'
import icon from '../../../assets/icon.png'
import { useNavigate } from 'react-router-dom'





function AddPlaylistCard({name,handleClick}) {
 


  return (
    <div
    className="flex flex-col w-[195px] h-auto p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
     
  >
    <div className="relative w-full h-50 group">
      < div className="absolute  inset-0 justify-center items-center hover:bg-white/10 bg-opacity-50" onClick={handleClick}></div>
      <a >
      <img className="hover:scale-100" src={icon}  ></img>
        </a>
    </div>
    <div className="mt-4 flex flex-col">
   
      <div className="flex justify-between items-center text-md">
      <p className="font-semibold text-lg text-white truncate">
      Create New {name}
      </p>

      </div>
    </div>
  </div>
  )
}

export default AddPlaylistCard