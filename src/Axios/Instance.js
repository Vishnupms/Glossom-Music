import axios from 'axios';

const Instance = axios.create({
    baseURL:"http://localhost:8000/api"
})


export default Instance