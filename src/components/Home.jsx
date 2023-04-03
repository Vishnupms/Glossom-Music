
import Discover from './Discover';
import Sidebar from './Sidebar';
import ToPlay from './MusicPlayer/ToPlay'
import Player from './MusicPlayer/Player';
import Header from './MusicPlayer/Header';







function Home() {

  return (
    <>
    <div className="relative flex ">
    <Sidebar />
    <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286] ">

    <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
    <div className="flex-1 h-fit pb-40">

      <Discover/>
   

    </div>
    <div className="xl:sticky relative top-0 h-fit">
         
    
            <ToPlay />
    </div>
    </div>
    </div>
    <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <Player />
        </div>
    </div>

    </>
    
    

  );
}


export default Home