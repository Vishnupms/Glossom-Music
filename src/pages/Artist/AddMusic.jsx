import React from 'react'
import AddTrack from '../../components/Artist/AddTrack'
import ArtistSidebar from '../../components/Artist/ArtistSidebar'

function AddMusic() {
  return (
    <div className="relative flex">
    <ArtistSidebar />
    <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#0ba874]">
        <AddTrack />
    
  
        </div>

        </div>
  )
}

export default AddMusic