import axios from "axios";
import Instance from "../Axios/Instance";

export const getAllTracks = async () => {
  try {
    const response = await Instance.get('/user/get-all-songs');
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const addplaylist = async () => {

  try {
    const response = await Instance.post('/user/add-playlist');
    const {data} = response 
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getAllPlaylist = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/user/get-all-playlist", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const deleteplaylist = async (id) => {

  try {
    const res = await axios.post(`http://localhost:8000/api/user/delete-playlist/${id}`,{}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getPlaylist = async (id) => {

  try {
    const res = await axios.get(`http://localhost:8000/api/user/get-playlist/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
 
export const addSongToPlaylist = async (obj) => {
  console.log(obj);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/user/add-to-playlist`,
      obj,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//..........................get Artist ............................
export const getArtist = async () => {
  
  try {
    const response = await Instance.get("/admin/show-artist")
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

//..........................add track...............................



//...................................................................
export const getViewPlaylist = async (id) => {
  console.log(id);
  try {
    const res = await axios.get(
      `http://localhost:8000/api/user/get-playlist-songs/${id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//........................ get genre.......................................
export const getGenre = async () => {
  try {
    const res = await Instance.get("/admin/get-genre", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//..........................ADD LIKE........................................
export const LikeSong = async (trackId, userId) => {
  try {
    const response = await Instance.post(`/user/like-song/${userId}/${trackId}`, {}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//...........................get liked songs...................................
export const getLikedSongs = async () => {
 
  try {
    const response = await Instance.get("/user/get-liked-songs", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//.............................check liked.............
export const checkLikedSong = async (id, songId) => {
  try {
    const response = await Instance.get(`/user/check-liked/${id}/${songId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//.............................FOLLOW...........................
export const FollowArtist = async (id, artistId) => {
  console.log(id, artistId, 'fIds');
  try {
    const response = await Instance.post(`/user/follow-artist/${id}/${artistId}`,{}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//..............................IS FOLLOWING............................
export const isFollowing = async (id, artistId) => {
  try {
    const response = await Instance.get(`/user/is-following/${id}/${artistId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//.............................unfollow .................................
export const UnfollowArtist = async (id, artistId) => {
  try {
    const response = await Instance.delete(`/user/unfollow-artist/${id}/${artistId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
//.....................................................................