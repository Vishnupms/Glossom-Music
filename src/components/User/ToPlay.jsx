/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from './Cards/PlayPause';
import { playerActions } from '../../redux/Slice/PlayerSlice';


const TopChartCard = ({ song, i,  isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.name===song?.name ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-16 h-16 rounded-lg" src={song?.imgURL} alt={song?.name} />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-lg font-bold text-white">
            {song?.name}
          </p>
        </Link>
        <Link to='/artists'>
          <p className="text-sm text-gray-300 mt-1">
            {song?.artist}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />

  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, data } = useSelector((state) => state.player);
 

  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  const handlePauseClick = () => {
    dispatch(playerActions.playPause(false));
  };
  
  const handlePlayClick = (song, i)=>{
    dispatch(playerActions.setActiveSong({
     activeSong:song,
     currentSongs:data,
     currentIndex:i

    }))
    dispatch(playerActions.playPause(true))

}
 


  return (
    <>
    
    <div ref={divRef} className="xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Songs</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="ml-2 mt-4 flex flex-col gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {[1,2,3,4,5].slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to='/artists'>
                <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </>
  );
  
};

export default TopPlay;
