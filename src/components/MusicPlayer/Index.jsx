import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playerActions } from '../../redux/Slice/PlayerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './SeekBar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const {  activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs?.length) dispatch(playerActions.playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playerActions.playPause(false));
    } else {
      dispatch(playerActions.playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playerActions.playPause(false));

    if (!shuffle) {
      dispatch(playerActions.nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(playerActions.nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(playerActions.prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(playerActions.prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(playerActions.prevSong(currentIndex - 1));
    }
  };
  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
