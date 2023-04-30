import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Instance from '../../Axios/Instance'
import SongCard from '../User/Cards/SongCard'
import { songActions } from '../../redux/Slice/SongSlice'
import { getAllTracks, getGenre } from '../../Api/Api'
import { playerActions } from '../../redux/Slice/PlayerSlice'


function Discover() {
  
  const [songs,setSongs] = useState([])
  const [genres,setGenres] = useState([])
  const [value,setValue] = useState('')
  const [tempSong, setTempSong] = useState([]);
  const {activeSong,isPlaying,currentSongs} = useSelector((state)=>state.player)
  const [selectedButton, setSelectedButton] = useState();

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
        dispatch(playerActions.setSong({
          songs:result.songs
        }))
      }
    }

    getAllSongs()
  },[setSongs])

//...................................................................................
  const filterByCategory = (category) => {
    setSelectedButton(category);
    const filteredCategory = songs.filter((song) => song.category === category);
    setTempSong(filteredCategory);
    
  };

  const handleSearch = () =>{
    
  }


  return (


    
    <div className='flex flex-col'>
      {/* search */}
      <div className="w-full max-w-md">
            <div className="flex items-center border-b-2 border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                onChange={(e) => {setSearch(e.target.value)}}
                type="text"
                placeholder="Search..."
                aria-label="Search"
              />
            
            </div>
          </div>



    <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Discover {value}</h2>

      {/* Filter */}
      <select
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="bg-black text-gray-300 p-2 text-sm rounded-lg mr-6 outline-none sm:mt-0 mt-5"
          onClick={() => filterByCategory(value)}
        >
          <option value="">All </option>
          {genres&&genres.map((genre) => <option key={genre?._id} value={genre?.name}>{genre.name}</option>)}
     </select>

    </div>
    <div className='flex flex-wrap text-white sm:justify-start justify-center gap-5'>
    {tempSong.length === 0 ? 
      
      (songs.length && songs.map((song,i)=>( 
        <SongCard
        key={song.key}
        song = {song}
        data = {songs}
        i={i}
        activeSong={activeSong}
        isPlaying={isPlaying}
        />
      ))) : (tempSong.length && tempSong.map((song,i)=>( 
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

    </div>
  )
}

export default Discover