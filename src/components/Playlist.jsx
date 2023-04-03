import React from 'react'
import Layout from '../pages/Artist/Layout'
import PlaylistCard from './MusicPlayer/PlaylistCard'

function Playlist() {
  return (
    <Layout>
      <div className="flex-1 h-fit pb-40">
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>My Playlist</h2>
      </div>
      <div className='flex  flex-wrap text-white sm: justify-center gap-6'>
       <PlaylistCard />
</div>

      </div>
    </Layout>
  )
}

export default Playlist