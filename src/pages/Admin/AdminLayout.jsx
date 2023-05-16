import React from 'react';

import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const AdminLayout = ({ children }) => {

  return (

 <div className="relative flex min-h-screen">
 <AdminSidebar />
 <Toaster position="top-center"></Toaster>
 <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#515252]">
  

  
     
      <main>
        {children}
        </main>

        </div>

    </div>
  );
};

export default AdminLayout;