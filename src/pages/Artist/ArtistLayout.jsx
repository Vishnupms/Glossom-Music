import React from 'react';
import Sidebar from '../../components/User/Sidebar';
import ArtistSidebar from '../../components/Artist/ArtistSidebar';
import { Toaster } from 'react-hot-toast';


const ArtistLayout = ({ children }) => {

  return (
    <div className="relative flex  ">
<ArtistSidebar/>
        <Toaster position="top-center"></Toaster>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#252525] ">
        <div className="parent-container flex justify-end items-center h-16 pr-4">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src="/docs/images/people/profile-picture-5.jpg"
            alt=""
          />
          <div className="font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </div>
  

  
     
      <main>
        {children}
        </main>

        </div>

    </div>


  );
};

export default ArtistLayout;