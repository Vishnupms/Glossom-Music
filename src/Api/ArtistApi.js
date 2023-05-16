import ArtistInstance from "../Axios/ArtistInstance";


export const addTrack = async (datas, img, audio, name, category) => {
    try {
      const response = await ArtistInstance.post(`/artist/add-track`, {
        datas, img, audio, name, category
      });
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  //..................get tracks.....................
  export const getMyTracks = async () => {
    try {
      const response = await ArtistInstance.get(`/artist/get-my-tracks`);
      const { data } = response;
      if (data) {
        return data;
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
  //...........................add album.............................
    
export const addAlbum = async(songId,name,imgURL)=>{
    try{
      const response = await ArtistInstance.post(`/artist/add-album`, {songId,name,imgURL});
      const { data } = response;
      if (data) {
        return data;
      }
    } 
    catch (error) {
      return error.response.data.error;
    }
  }
//....................................................................

export const getChartDet = async (id) => {
  try {
    const response = await ArtistInstance.get(`/artist/follow-chart/${id}`);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//....................Delete SOngs..............................
export const deleteSong = async (id) => {
  try {
    const response = await ArtistInstance.delete(`/artist/delete-song/${id}`);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

