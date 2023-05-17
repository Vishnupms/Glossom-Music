import axios from 'axios';
  //............ARTIST.............
const AdminInstance = axios.create({
    baseURL:"https://glossom.onrender.com/api"
  })
// const AdminInstance = axios.create({
//     baseURL:"http://localhost:8000/api"
//   })
  
  
  //ADD INTERCEPTOR FOR ARTIST
  AdminInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("admintoken");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  export default AdminInstance