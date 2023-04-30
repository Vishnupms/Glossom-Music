import axios from 'axios';

const Instance = axios.create({
    baseURL:"http://localhost:8000/api"
})

  // ------------------------------------------------------------------------Axios Interceptors-----------------------------------------------------------//
 
  // Injecting jwt in every request 
  
  Instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  


export default Instance