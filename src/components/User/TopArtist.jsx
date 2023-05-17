import React, { useEffect, useState } from 'react'
import ArtistCard from '../../components/User/Cards/ArtistCard'
import Layout from '../../pages/User/Layout';
import { getArtist } from '../../Api/Api';
import Dropdown from './Cards/DropDown';

function TopArtist() {
  const [artist, setArtist] = useState([]);
  useEffect(() => {
  async function invoke() {
 const data = await getArtist();
 if (data.status === "failed") {
  navigate("/");
} 
else {
  setArtist(data);
}
    }
  invoke();
  }, []);


  return (

        <Layout>

<div className="px-6 h-screen overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
    <div className="flex-1 h-fit pb-40">


    <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-2xl text-white text-left'>Top Artists</h2>
      </div>
    

    <div className='flex  flex-wrap text-white sm: justify-start gap-6'>
    {artist.map((artist) => (
        
        <ArtistCard 
        data={artist}
        />
        
        
        
        
        ))}
        </div>
    </div>
    <div className="mt-2 ml-72">

      <Dropdown />
        </div>

</div>
    </Layout>

  )
}

export default TopArtist