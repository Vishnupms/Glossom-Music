import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { songActions } from "../../redux/Slice/SongSlice";

function Player() {
  const { songUrl, imageUrl} = useSelector((state) => state.song)
  const dispatch = useDispatch();
  const handlePlayClick = () => {
    dispatch(songActions.setSongUrl(songUrl));
  }
  return (
    <div className="flex w-[100%] items-center mb-2 py-2">
      <div className="w-40 ">
        <img src={imageUrl } alt="songImg" className="w-32 h-20" />
      </div>
      <div className="w-[80%]">
        <AudioPlayer
          src={songUrl}
           onClick={handlePlayClick}
          
        />
      </div>
    </div>
  );
}

export default Player;
