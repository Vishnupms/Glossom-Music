import React, { useEffect, useState } from 'react'
import PlaylistCard from '../Cards/PlaylistCard'
import AddPlaylistCard from '../Cards/addPlaylistCard'
import { getAllPlaylist } from '../../../Api/Api'
import Layout from '../../../pages/User/Layout'


function Playlist() {
  const [playlist,setPlaylist]= useState("")
  useEffect(() => {
    async function invoke() {
      const data = await getAllPlaylist();
      console.log(data);
      if (data.success === false) {

        console.log(data)
      } else {
        setPlaylist(data.data)
      }
    }
    invoke();
  }, []);

  return (
    <>
    <Layout>
    <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
      <div className="flex-1 h-fit ">
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4'>
      <h2 className='font-bold text-2xl text-white text-left'>My Playlist</h2>
      </div>
      <div className='flex  flex-wrap text-white justify-center sm: gap-6'>
       <AddPlaylistCard   />
       <hr className='w-full border-1 border-white' />
       {playlist ?playlist.length&& playlist.map((data, index) => (
       <PlaylistCard
       key = {index}
       data= {data} />
)) : null}

       
</div>

      </div>
      </div>
    </Layout>
    </>
  )
}

export default Playlist