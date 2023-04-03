import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { songActions } from "../../redux/Slice/SongSlice";
import {AiOutlineHeart} from 'react-icons/ai'

const SongCard = ({ data,index}) => {
  const dispatch = useDispatch()
  const onClickHandler = ()=>{
     dispatch(songActions.setImageUrl(data.imgURL))
     dispatch(songActions.setSongUrl(data.songURL))
  }
  return (
    <div
      className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => onClickHandler()}
    >
      <div className="relative w-full h-50 group">
        <div className={"absolute  inset-0 justify-center items-center hover:bg-black/50 bg-opacity-50"}></div>
        <img className="hover:scale-100" src={data.imgURL}></img>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link>{data.name}</Link>
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm truncate text-gray-300 mt-1">
            <Link>{data.artist}</Link>
          </p>
          <AiOutlineHeart />
        </div>
      </div>
    </div>
  );
  
};


export default SongCard;
