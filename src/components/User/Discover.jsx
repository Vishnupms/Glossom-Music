import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SongCard from '../User/Cards/SongCard'
import { getAlbum, getAllTracks, getGenre } from '../../Api/Api'
import { playerActions } from '../../redux/Slice/PlayerSlice'
import Searchbar from './Playlist/SerchBar'
import AlbumCard from './Cards/AlbumCard'


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
 

 

  // const searchData = (songs) => {
  //   return search === ""
  //     ? songs
  //     : songs.category.toLowerCase().includes(search) ||
  //         song.name.toLowerCase().includes(search) ||
  //         song.artist.toLocaleLowerCase().includes(search);
  // };


  useEffect(() => {
    async function invoke() {
      const datas = await getGenre();
      if (datas.status === "failed") {
      //  console.log(data,"dataaa")
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
      console.log(result,";njdcbksnc")
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



  const handleSearch = () =>{
    
  }


  return (


    
    <div className=' flex flex-col'>
     <Searchbar/>


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
      
   "no songs" : (tempSong.length && tempSong.map((song,i)=>( 
        <SongCard
        key={song.key}
        song = {song}
        data = {songs}
        i={i}
        activeSong={activeSong}
        isPlaying={isPlaying}
        />
      )))
      }
    </div>
    <div className='w-full mt-16 flex justify-between items-center sm:flex-row flex-col  mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Top Albums</h2>
      </div>
      <div className='flex flex-wrap text-white sm:justify-start gap-5'>
    {
      
      (albums.map((album,i)=>( 
        <AlbumCard
        data = {album}
        />
      ))) 
      }
    </div>
 </div>

   
  )
}

export default Discover