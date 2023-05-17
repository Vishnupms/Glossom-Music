import React from "react";
import { useSelector } from "react-redux";
import Discover from "../../components/User/Discover";
import TopPlay from "../../components/User/ToPlay";
import MusicPlayer from "../../components/MusicPlayer/Index";
import Sidebar from "../../components/User/Sidebar";
import Dropdown from "../../components/User/Cards/DropDown";


function HomePage() {
  const {activeSong} = useSelector((state)=>state.player)
  

  return (
    <>
   <div className="relative flex  ">
<Sidebar/>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#8603b9] ">
          
  
    <div className="px-6 h-[calc(100vh-0px)]  overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
      
    <div className="flex-1 h-fit pb-40">
      
      
      <Discover/>
   

    </div>
      <div className="xl:sticky relative top-2 h-fit">
        <div className="ml-44">

      <Dropdown />
        </div>
          
      
              <TopPlay />
      </div>
    </div>

    {/* {activeSong?.songURL && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#063c55] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )} */}
 </div>
    </div>
    </>
    
    

  );
}


export default HomePage