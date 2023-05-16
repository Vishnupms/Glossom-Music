import React, { useEffect, useState } from 'react'
import AdminLayout from '../../pages/Admin/AdminLayout';
import AdminCard from './AdminCard';
import { getAllCount, getUserChart } from '../../Api/AdminApi';
import UserCharts from './Charts';
import Charts from './Charts';


function AdminDash() {
  const [song, setSong] = useState(0);
  const [user, setUser] = useState(0);
  const [artist, setArtist] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserChart();
        setData(result.data);
      } catch (error) {
        console.log(error);
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

        console.log(data, "data");
      }
    }
    invoke();
  }, []);
  console.log(song, "song");

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
  <h3 className='text-white text-center text-xl'>Charts</h3>
  <div className='mt-5'>

<Charts
data={data}
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