import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SongCard from '../User/Cards/SongCard'
import { getAlbum, getAllTracks, getGenre } from '../../Api/Api'
import { playerActions } from '../../redux/Slice/PlayerSlice'
import Searchbar from './Playlist/SerchBar'
import AlbumCard from './Cards/AlbumCard'
import { FiSearch } from 'react-icons/fi'


function Discover() {
  
  const [songs,setSongs] = useState([])
  const [genres,setGenres] = useState([])
  const [albums,setAlbums] = useState([])
  const [value,setValue] = useState('')
  const [tempSong, setTempSong] = useState([]);
  const {activeSong,isPlaying,currentSongs} = useSelector((state)=>state.player)
  const [selectedButton, setSelectedButton] = useState("All");

  const [search, setSearch] = useState("");
  const [filter,setFilter] = useState('')
  const dispatch = useDispatch()
 

 

  const searchData = (songs) => {
    return search === ""
      ? songs
      : songs.category.toLowerCase().includes(search) ||
          songs.name.toLowerCase().includes(search) ||
          songs.artist.toLocaleLowerCase().includes(search)||
          songs.album.toLocaleLowerCase().includes(search)
  };


  useEffect(() => {
    async function invoke() {
      const datas = await getGenre();
      if (datas.status === "failed") {
      } else {
        setGenres(datas?.category);
     
        genres
            ? setTempSong(datas.filter((song) => song.category === genres))
            : setTempSong(datas.category)
      }
    }
    invoke();
  }, []);

//................................get all songs....................................
  useEffect(()=>{
    const getAllSongs = async()=>{
      const result = await getAllTracks();
      if(result.success){
        setSongs(result.songs)
        setTempSong(result.songs)
        dispatch(playerActions.setSong({
          songs:result.songs
        }))
      }
    }

    getAllSongs()
  },[setSongs])

//...................................................................................
useEffect(()=>{
  const getAllAlbums = async()=>{
    const result = await getAlbum();
    if(result.success){
      setAlbums(result.data)


    }
  }

  getAllAlbums()
},[setAlbums])
//...................................................................................

  const filterByCategory = (category) => {
    setSelectedButton(category);
    if(category ==="All"){
      setTempSong(songs)
      return
    }
    const filteredCategory = songs.filter((song) => song.category === category);
    setTempSong(filteredCategory);
    
  };



 

  return (


    
    <div className=' flex flex-col'>
     <div className="flex pb-2 bg-transparent dark:bg-gray-900">
     <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start w-full items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          onChange={(e) => {
            let searchValue = e.target.value.toLocaleLowerCase();
            setSearch(searchValue);
          }}
        />
      </div>
          </div>


    <div className='w-full flex justify-between items-center sm:flex-row flex-col  mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Discover {value}</h2>

      {/* Filter */}
      <select
          value={value}
          className="bg-black text-gray-300 p-2 text-sm rounded-lg mr-6 outline-none sm:mt-0 mt-5"
          onClick={(e) => {filterByCategory(e.target.value)}}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="All">All </option>
          {genres&&genres.map((genre) => <option key={genre?._id} value={genre?.name}>{genre.name}</option>)}
     </select>

    </div>
    <div className='flex flex-wrap text-white sm:justify-start justify-center gap-5'>
    {tempSong.length === 0 ? 
      
   "There is no song in this category" : (tempSong.filter(searchData).length > 0 ? tempSong.filter(searchData).map((song,i)=>( 
        <SongCard
        key={song.key}
        song = {song}
        data = {songs}
        i={i}
        activeSong={activeSong}
        isPlaying={isPlaying}
        />
      )):(
        <p>Sorry there is no song with this name.</p>
      ))
      }
    </div>
    <div className='w-full mt-16 flex justify-between items-center sm:flex-row flex-col  mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Top Albums</h2>
      
      </div>
      <div className='flex flex-wrap text-white sm:justify-start gap-5'>
      <h4>coming soon</h4>
    {/* {
      
      (albums.map((album,i)=>( 
        <AlbumCard
        data = {album}
        />
      ))) 
      } */}
    </div>
 </div>

   
  )
}

export default Discover