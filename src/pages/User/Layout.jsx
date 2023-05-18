import React from 'react';
import Sidebar from '../../components/User/Sidebar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {

  return (

 <div className="relative flex  ">
<Sidebar/>
        <Toaster position="top-center"></Toaster>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
  

  
     
      <main>
        {children}
        </main>

        </div>

    </div>
  );
};

export default Layout;