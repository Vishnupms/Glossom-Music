import React, { useState } from 'react'
import Layout from './Layout'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Tables from '../../components/User/Cards/Tables'

function ArtistPage() {
    const location = useLocation()
    const data = location?.state
    const [img,setImg] = useState(data.imgURL)
    const song = useSelector((state) => state.player.data)

    const filteredSongs = song.filter((song) => song.artist === data.username);

 
  return (
    <Layout>
      <div className="px-6 h-[calc(100vh)]  hide-scrollbar flex xl:flex-row flex-col-reverse">
      <div className="mt-28 flex-1 h-50  ">
      <div className="relative">
      <div className="xl:ml-32 -mt-24 absolute ">
      <div className="w-36 h-36 bg-slate-200 flex items-center justify-center text-indigo-500 rounded-full">
        {img?<img className='rounded-full' src={img}></img>:<svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>}
      
        </div>

      </div>
      
    </div>


    <div className="text-center -mt-16 border-b pb-9 flex items-center justify-center">
  <h3 className="text-white ml-28 text-4xl mr-2">{data.username}</h3>
  <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 xl:ml-60 text-center mb-2">Follow</button>
</div>

  
   <div className="mt-9 w-4/5 overflow-y-hidden mx-auto">
  <Tables data={filteredSongs} />
</div>


 
      </div>
  
      </div>
    
      </Layout> 
  )
}

export default ArtistPage