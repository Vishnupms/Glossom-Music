import React, { useEffect, useState } from 'react'
import AdminLayout from '../../pages/Admin/AdminLayout';
import AdminCard from './AdminCard';
import { getAllCount, getArtistChart, getUserChart } from '../../Api/AdminApi';
import UserCharts from './Charts';
import Charts from './Charts';
import ArtistCharts from './ArtistCharts';


function AdminDash() {
  const [song, setSong] = useState(0);
  const [user, setUser] = useState(0);
  const [artist, setArtist] = useState(0);
  const [data, setData] = useState([]);
  const [artistData, setArtistData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserChart();
        setData(result.data);
      } catch (error) {
   
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getArtistChart();
        console.log(result)
        setArtistData(result.data);
      } catch (error) {
   
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function invoke() {
      const data = await getAllCount();
      if (data.success) {
        setSong(data.songs);
        setUser(data.users)
        setArtist(data.artist)


      }
    }
    invoke();
  }, []);


  let num = 5;
  const card = [
    {
      title: `Total Songs - ${song} `,
      footer: `There is a ${num}% increase in songs by last week`,
    },
    {
      title: `Total Users - ${user}`,
      footer: `There is a ${num}% increase in listeners by last week`,
    },
    {
      title: `Total Artists - ${artist} `,
      footer: `There is a ${num}% increase in Artists by last week`,
    },
  ];
    
 



  return (
<>
<AdminLayout>
<div className="px-6 h-screen overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">

<div className="flex-1 h-50  ">
  <div className="mb-12 grid gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3 ">
      {card.map(({title,footer})=>(
        <AdminCard
        title={title}
        footer={footer}
        
        />
      ))}

    </div>
 
<div className=''>
  <h3 className='text-white text-center text-xl'><u>User Charts</u></h3>
  <div className='mt-5'>

<Charts
data={data}
/>
</div>
</div>
<div className='mt-5'>
<h3 className='text-white text-center text-xl'><u>Artist Charts</u></h3>
  <div className='mt-5'>

<ArtistCharts
data={artistData}
/>
</div>
</div>
</div>
  </div>

</AdminLayout>

 

 
</>
  )
}

export default AdminDash