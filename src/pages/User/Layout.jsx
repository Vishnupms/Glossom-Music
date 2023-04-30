import React from 'react';
import Sidebar from '../../components/User/Sidebar';
import Player from '../../components/MusicPlayer/Player';
import { useSelector } from 'react-redux';
import MusicPlayer from '../../components/MusicPlayer/Index';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  const {activeSong} = useSelector((state)=>state.player)
  return (

 <div className="relative flex  ">
<Sidebar/>
        <Toaster position="top-center"></Toaster>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#063c55] ">
  

  
     
      <main>
        {children}
        </main>

        </div>

    </div>
  );
};

export default Layout;