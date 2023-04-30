import React from "react";
import user from '../../assets/user.jpg'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const ArtistIcon = ({ toggle }) => {
  const { name} = useSelector((state) => state.artist)
  return (
    <div
      className=" mt-2 flex  items-center bg-black  bg-opacity-80 rounded-3xl"
    >
      <div className="min-w-[3rem] h-[3rem]">
        <Link to={"/artist/profile"}>
        <img
          src={user}
          alt=""
          className="w-full h-full  rounded-full object-cover"
          
        />
        </Link>
      </div>
      <div className="">
        <h3 className=" text-lg text-white/50">{name}</h3>
        
      </div>
    </div>
  );
};

export default ArtistIcon;