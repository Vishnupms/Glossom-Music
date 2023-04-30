import React, { useEffect, useState } from "react";
import icon from "../../../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";


function PlaylistCard(data) {

  const navigate = useNavigate();

  return (
    <>
      <div
        className="relative flex flex-col w-[180px] h-auto p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      >
        <div className="relative w-full h-50 group">
          <Link to={"/get-playlist"} state={data?.data._id}>
          <div className="absolute inset-0 justify-center items-center hover:bg-white/10 bg-opacity-50"></div>
            <img className="hover:scale-100" src={icon} />
          </Link>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex justify-between items-center text-md">
            <p className="font-semibold text-lg text-white truncate">
              {data.data.title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaylistCard;
