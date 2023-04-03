import React from 'react'
import ArtistCard from '../components/MusicPlayer/ArtistCard'
import Player from '../components/MusicPlayer/Player'
import Sidebar from '../components/Sidebar'

function TopArtist() {
  return (
    <div className="relative flex mx-auto ">
    <Sidebar />
    <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        

    <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
        
    <div className="flex-1 h-fit pb-40">

    <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Top Artists</h2>
      </div>
    

    <div className='flex  flex-wrap text-white sm: justify-start gap-6'>
    {[1,2,3,4,5].map(() => (
        
        <ArtistCard 
        
        />
        
        
        
        
        ))}
        </div>
    </div>
    </div>

  
    </div>
    <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <Player />
        </div>
    </div>

  )
}

export default TopArtist