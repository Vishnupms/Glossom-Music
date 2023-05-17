import axios from 'axios';
  //............ARTIST.............
const ArtistInstance = axios.create({
    baseURL:"https:glossom.onrender.com/api"
  })
  // const ArtistInstance = axios.create({
  //   baseURL:"http://localhost:8000/api"
  // })
  
  
  //ADD INTERCEPTOR FOR ARTIST
  ArtistInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("artisttoken");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  export default ArtistInstance