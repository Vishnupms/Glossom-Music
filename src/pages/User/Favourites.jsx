import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Tables from '../../components/User/Cards/Tables'
import { getLikedSongs } from '../../Api/Api'

function Favourites() {
    const [likedSong,setLikedSong] = useState([])

    useEffect(() => {
        const invoke = async () => {
          const response = await getLikedSongs();
          if (response.success) {
            setLikedSong(response.songs)
           
          }
        };
        invoke();
      }, []);
      console.log(likedSong,"dsfsgs")
  return (
    <Layout>
    <div className="px-6 h-[calc(100vh)]  hide-scrollbar flex xl:flex-row flex-col-reverse">
    <div className="mt-8 flex-1 h-50  ">


  <div className="text-center border-b pb-5 flex items-center justify-center">
<h3 className="text-white ml-15 text-4xl ">My Favourites</h3>

</div>


 <div className="mt-9 w-4/5 overflow-y-hidden mx-auto">
<Tables
data = {likedSong}
/>
</div>



    </div>

    </div>
  
    </Layout> 
  )
}

export default Favourites