import React from 'react';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/MusicPlayer/Player';

const Layout = ({ children }) => {
  return (
    <div>
        <div className="relative flex ">
      <header>
      <Sidebar />
        </header>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286] ">
        <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
      <main>
        {children}
        </main>
        </div>
        </div>

      <footer>
      <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <Player />
        </div>
        </footer>
    </div>
    </div>
  );
};

export default Layout;