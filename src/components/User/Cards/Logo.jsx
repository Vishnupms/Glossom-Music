import React from "react";
import logo from '../../../assets/logo.png'
import { Link } from "react-router-dom";


const Logo = ({ toggle }) => {
  return (
    <div
      className={` flex gap-3 items-center ${
        toggle
          ? "bg-none transition-all duration-300 delay-200"
          : "bg-gradient-to-br from-black to-[#72069c]  rounded-3xl "
      }`}
    >
      <div className="min-w-[3.7rem] h-[3.7rem]">

        <img
          src={logo}
          alt=""
          className="w-full h-full rounded-full object-cover"
          
        />
      </div>
      <div className={toggle ? "opacity-0 delay-200" : ""} >
        <h3 className="text-xl text-purple-400">Glossom</h3>
        
      </div>
    </div>
  );
};

export default Logo;