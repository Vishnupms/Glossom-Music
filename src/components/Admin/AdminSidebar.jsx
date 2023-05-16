import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome,HiOutlineUser, HiOutlineUserGroup } from 'react-icons/hi';

const menus = [
    { name: 'Dashboard', to: '/admin', icon: HiOutlineHome },
    { name: 'Users', to: '/admin/users', icon:HiOutlineUserGroup  },
    { name: 'Artist', to: '/admin/artist', icon:HiOutlineUser  },
    { name: 'Genre', to: '/get-genre', icon: HiOutlineHashtag },
  ];

function AdminSidebar() {
    

    return (
      <>
      <div className=" md:flex hidden gap-6"> 
        <div
          className="bg-[#333232] min-h-screen w-[12rem]"
        >
          <div className="py-3 flex justify-end">
           
          </div>
          <div className="mt-5 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.to}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white z-20 font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
       
      </div>
  
        
      
    </>
    );
}

export default AdminSidebar