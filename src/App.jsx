import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import ArtistRoutes from "./Routes/ArtistRoutes";
import UserRoutes from "./Routes/UserRoutes";
import MusicPlayer from "./components/MusicPlayer/Index";
import { useSelector } from "react-redux";


const App = () => {
  const {activeSong} = useSelector((state)=>state.player)
  const { token } = useSelector((state) => state.user);
  const { artistToken } = useSelector((state) => state.artist);

  return (
    <Router>
  
      <Routes>
        <Route path="/artist/*" element={<ArtistRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      {(token || artistToken)&&activeSong.songURL&&(
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#063c55] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
  </Router>

  );
};

export default App;