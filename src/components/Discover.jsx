import React, { useEffect, useState } from 'react'
import {genres} from '../assets/constants'
import { useDispatch } from 'react-redux'
import { songActions } from '../redux/Slice/SongSlice'
import Instance from '../Axios/Instance'
import SongCard from './MusicPlayer/SongCard'

function Discover() {
  const genreTitle = 'Pop'
  const [songs,setSongs] = useState([])
  const dispatch = useDispatch();

  const getAllSongs = async()=>{
    await Instance.get('/artist/get-all-tracks').then((res)=>{
      setSongs(res.data.songs)
      console.log(res.data.songs[0].songURL,'urlllll loged here')
      dispatch(
        songActions.setSong({
          songs: res.data.songs
        })
      );
    })
  }
  useEffect(()=>{

    getAllSongs()
  },[])

  return (
    <div className='flex flex-col'>
    <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Discover {genreTitle}</h2>

      <select
          onChange={(e) =>{}}
          value=''
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>

    </div>
    <div className='flex flex-wrap text-white sm:justify-start justify-center gap-5'>
      
    {songs.length && songs.map((song,i)=>( 
      <SongCard
      key={song._id}
      data = {song}
      index = {i}
      />
    ))}
    </div>

    </div>
  )
}

export default Discover