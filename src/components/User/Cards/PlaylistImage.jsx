import React from 'react'
import icon from '../../../assets/icon.png'



function PlaylistCard2() {

  return (
    <div
    className="flex flex-col w-[120px] h-auto p-4 bg-white/10  backdrop-blur  rounded-lg cursor-pointer"
  
  >
    <div className="relative w-50 h-30 ">
      < div className="absolute  inset-0 justify-center items-center hover:bg-black/30 bg-opacity-50" ></div>
  
      <img className="ml-3 hover:scale-100" src={icon}  ></img>
      
    </div>
    <div className="mt-4 flex flex-col">
   
      <div className="flex justify-between items-center text-md">
      <p className="font-semibold text-lg text-white truncate">
      
      </p>

      </div>
    </div>
  </div>
  )
}

export default PlaylistCard2