import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const ArtistCard = ({ data,index}) => {


  return (
    <div
      className="flex flex-col w-[210px] h-auto p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    
    >
      <div className="relative w-full h-50 group">
        <div className={"absolute  inset-0 justify-center items-center hover:bg-black/50 bg-opacity-50"}></div>
        <img className="hover:scale-100" src="https://www.cheatsheet.com/wp-content/uploads/2021/07/eminem-and-a-microphone.jpg?w=1200&h=901"></img>
      </div>
      <div className="mt-4 flex flex-col">
     
        <div className="flex justify-between items-center text-md">
        <p className="font-semibold text-md text-white truncate">
          <Link>Eminem</Link>
        </p>
          <AiOutlineUserAdd className="text-xl" />
        </div>
      </div>
    </div>
  );
  
};


export default ArtistCard;
