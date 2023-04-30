import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { playerActions } from "../../../redux/Slice/PlayerSlice";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import PlayPause from "./PlayPause";
import { LikeSong, checkLikedSong } from "../../../Api/Api";

const SongCard = ({ song,data,i,activeSong,isPlaying}) => {
  const {id} = useSelector((state)=>state.user)

  const [liked,setLiked] = useState(true)
  const dispatch = useDispatch()
  const [songId, setSongId] = useState("");
  const handlePauseClick = () => {
    dispatch(playerActions.playPause(false));
  };
  
  const handlePlayClick = ()=>{
     dispatch(playerActions.setActiveSong({
      activeSong:song,
      currentSongs:data,
      currentIndex:i

     }))
     dispatch(playerActions.playPause(true))

}

useEffect(() => {
  const check = async () => {
    const result = await checkLikedSong(id, song._id);
    if (result.success) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  check();
}, [liked]);

const likeSong = async () => {
  const result = await LikeSong(song._id, id);
  if (result.success) {
    setLiked(true);
    console.log(result.message,"mssss");
  } else {
    setLiked(false);
    console.log(result.message,"msssss");
  }
};

  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-3xl cursor-pointer">
    <div className="relative w-full h-44 group">
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-3xl group-hover:flex ${activeSong?.name === song.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
      <img alt="song_img" src={song.imgURL} className="w-full h-full rounded-3xl" />
    </div>

    <div class="mt-4 flex flex-row items-center justify-between">
  <div class="flex flex-col">
    <p class="font-semibold text-lg text-white truncate">
      <Link to={`/songs/${song?.key}`}>{song.name}</Link>
    </p>
    <p class="text-sm truncate text-gray-300">
      <Link to={song.artist}>{song.album}</Link>
    </p>
  </div>
  {liked?<AiFillHeart class="ml-2" onClick={likeSong} style={{ fontSize:"20", color: 'red' }} />:<AiOutlineHeart class="ml-2" onClick={likeSong} />}
</div>

  </div>
  );
  
};


export default SongCard;
