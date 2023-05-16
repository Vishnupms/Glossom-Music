import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

const menus = [
    { name: 'Dashboard', to: '/artist', icon: HiOutlineHome },
    { name: 'Add Music', to: '/artist/addmusic', icon: HiOutlinePhotograph },
    { name: 'Albums', to: '/artist/create-album', icon: HiOutlineUserGroup },
    { name: 'Profile', to: '/artist/profile', icon: HiOutlineHashtag },
  ];

function ArtistSidebar() {
    const [open, setOpen] = useState(false);

    return (
      <>
      <div className=" md:flex hidden gap-6"> 
        <div
          className={`bg-[#072c29] min-h-screen ${
            open ? "w-[12rem]" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            
            <HiOutlineMenu
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
           
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
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
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

export default ArtistSidebar