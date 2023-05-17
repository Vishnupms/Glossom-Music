import React, { useRef, useEffect } from 'react';
import Instance from '../../Axios/Instance';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    let intervalId;
    let viewCounted = false;
  
    const handleTimeUpdate = () => {
      const currentTime = ref.current.currentTime;
      if (currentTime >= 40 && !viewCounted) {
        const incrementViewCount = async () => {
          try {
            const response = await Instance.post(`/user/set-view/${activeSong._id}`);
          } catch (error) {
          }
        };
        incrementViewCount();
        viewCounted = true;
        clearInterval(intervalId);
      }
    };
  
    if (isPlaying) {
      intervalId = setInterval(handleTimeUpdate, 1000);
    }
  
    return () => clearInterval(intervalId);
  }, [isPlaying, activeSong]);
  

  return (
    <audio
      src={activeSong?.songURL}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
