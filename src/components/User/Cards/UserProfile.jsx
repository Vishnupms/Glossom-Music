import React from "react";
import user from '../../../assets/icon.png'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const UserProfile = ({ toggle }) => {
  const { name,ImgURL} = useSelector((state) => state.user)
  return (
    <div
      className={` flex gap-3 items-center ${
        toggle
          ? "bg-none transition-all duration-300 delay-200"
          : "bg-black bg-opacity-40 rounded-3xl "
      }`}
    >
      <div className="min-w-[3.2rem] h-[3.2rem]">
        <Link to={"/profile"}>
        <img
          src={user}
          alt=""
          className="w-full h-full rounded-full object-cover"
          
        />
        </Link>
      </div>
      <div className={toggle ? "opacity-0 delay-200" : ""} >
        <h3 className="text-xl">{name}</h3>
        
      </div>
    </div>
  );
};

export default UserProfile;