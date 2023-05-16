import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import ArtistRoutes from "./Routes/ArtistRoutes";
import UserRoutes from "./Routes/UserRoutes";
import MusicPlayer from "./components/MusicPlayer/Index";
import { useSelector } from "react-redux";
import AdminRoutes from "./Routes/AdminRoutes";
import LangingPage from "./components/Landing Page/LangingPage";



const App = () => {
  const {activeSong} = useSelector((state)=>state.player)
  const { token } = useSelector((state) => state.user);
  const { artistToken } = useSelector((state) => state.artist);

  return (
    <Router>
  
      <Routes>
        <Route path="/artist/*" element={<ArtistRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      {(token||artistToken)&&activeSong.songURL&&(
        <div className="absolute bottom-0 h-24 left-0 right-0 flex animate-slideup bg-gradient-to-br from-black/10 to-[#2e0352]  backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
  </Router>

  );
};

export default App;