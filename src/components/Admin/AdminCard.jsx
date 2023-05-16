import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminCard({title,footer,num}) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (title === 'My Songs') {
      navigate('/artist/my-songs');
      console.log("first")
    }
  
  };

  return (
    <div class="mt-5 max-w-xs mx-auto cursor-pointer " onClick={handleCardClick}>
    <div class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg overflow-hidden">
    <div class="px-4 py-5 sm:p-6">
  <div class="flex items-center mb-4">
    <h3 class="text-lg font-medium leading-6 text-white/80 mr-2">{title}</h3>
   
  </div>
  <div class="mt-4 text-gray-500">
    <p class="mb-4">{footer}</p>
  </div>
</div>
    </div>
  </div>

  )
}

export default AdminCard