import AdminInstance from "../Axios/AdminInstance";

export const verifyArtist = async (id) => {
    try {
      const response = await AdminInstance.get(`/admin/verify-artist/${id}`);
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  export const blockUser = async(id)=>{
    try {
      const response = await AdminInstance.get(`/admin/block-user/${id}`);
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  }

  export const postCategory = async (obj) => {
    try {
  
      const res = await AdminInstance.post("/admin/add-category",obj);
      const data = res.data;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
  export const getCatagory = async () => {
    try {
      const res = await AdminInstance.get("/admin/get-genre");
      const data = res.data;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  // export const getAllUser = async()=>{
  //   try {
      
  //     axios.get('http://localhost:8000/api/admin/show-users').then((response)=>{
  //       const {data} = response;

  //       if (data) {
  //         return data;
  //       }
        
  //     })
  //   } catch (error) {
  //     return error.response.data.error;
  //   }
  // }

  export const getAllUsers = async () => {
    try {
      const res = await AdminInstance.get("/admin/show-users");
      const data = res.data;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  export const getAllArtist = async () => {
    try {
      const res = await AdminInstance.get("/admin/show-artist");
      const data = res.data;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  export const getAllCount = async () => {
    try {
      const res = await AdminInstance.get("/admin/get-all-count");
      const data = res.data;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  //..............................................
  export const getUserChart = async () => {
    try {
      const response = await AdminInstance.get(`/admin/user-chart`);
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  export const getArtistChart = async () => {
    try {
      const response = await AdminInstance.get(`/admin/artist-chart`);
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
 
 