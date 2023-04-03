import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import ArtistRoutes from "./Routes/ArtistRoutes";
import UserRoutes from "./Routes/UserRoutes";


const App = () => {
  

  return (
    <Router>
    <Routes>
      <Route path="/artist/*" element={<ArtistRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  </Router>

  );
};

export default App;