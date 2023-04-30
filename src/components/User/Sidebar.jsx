import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import UserProfile from './Cards/UserProfile';


const menus = [
  { name: 'Discover', to: '/home', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Playlists', to: '/playlist', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artist', icon: HiOutlineUserGroup },
  { name: 'Favourites', to: '/my-favourites', icon: HiOutlineHashtag },
];


const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
    <div className=" md:flex hidden gap-6"> 
      <div
        className={`bg-[#05201c] min-h-screen ${
          open ? "w-[13rem]" : "w-16"
        } duration-500 text-gray-100 px-2`}
      >
        <div className="py-4 flex justify-end">
          
          <HiOutlineMenu
            size={15}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
         
        </div>
        <UserProfile />
        <div className="mt-5 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.to}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-base  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "30" })}</div>
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
};

export default Sidebar;