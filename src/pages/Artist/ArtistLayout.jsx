import React from 'react';
import ArtistSidebar from '../../components/Artist/ArtistSidebar';
import { Toaster } from 'react-hot-toast';

const ArtistLayout = ({ children }) => {

  return (

 <div className="relative flex min-h-screen">
 <ArtistSidebar />
 <Toaster position="top-center"></Toaster>
 <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#063c55]">
  

  
     
      <main>
        {children}
        </main>

        </div>

    </div>
  );
};

export default ArtistLayout;