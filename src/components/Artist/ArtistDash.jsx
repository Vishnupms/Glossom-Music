import React, { useEffect, useState } from 'react'
import { getMyTracks } from '../../Api/ArtistApi';
import Card from './Card';
import ArtistCharts from './ArtistCharts';
import ArtistLayout from '../../pages/Artist/ArtistLayout';
import { useNavigate } from 'react-router-dom';
import { playerActions } from '../../redux/Slice/PlayerSlice';
import { useDispatch } from 'react-redux';
import ArtistDropdown from './ArtistDropDwn';


function ArtistDash() {
  const [songCount,setSongCount] = useState(0)
 const dispatch = useDispatch()

const num= 5
  const card = [
    {
      title:"My Songs",
      footer:`There is a ${songCount}% increase in listeners by last week`,
      
    },
    {
      title:"My Albums",
      footer:`There is a ${num}% increase in listeners by last week`
    },
    {
      title:"My Followers",
      footer:`There is a ${num}% increase in folowers by last week`
    },
    
  ]

    
  useEffect(() => {
    const invoke = async () => {
        const result = await getMyTracks();
        if (result.success) {
          setSongCount(result.songs.length)
          dispatch(playerActions.setSong({
            songs:result.songs
          }))
     
        }
      };
    invoke();
  }, []);



  return (
<>
<ArtistLayout>
<div className="px-6 h-screen overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">

<div className="flex-1 h-50  ">
  <div className="mt-8 grid gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3 ">
      {card.map(({title,footer})=>(
        <Card
        title={title}
        footer={footer}
        num = {songCount}
        />
      ))}

    </div>
 
<div className='mt-5'>
  <h3 className='text-white text-center text-xl'>Followers Charts</h3>
<div className='mt-5'>

   <ArtistCharts />
</div>
</div>
</div>
<div className="flex justify-end mt-2">
          <ArtistDropdown />
        </div>
  </div>

</ArtistLayout>

 

 
</>
  )
}

export default ArtistDash