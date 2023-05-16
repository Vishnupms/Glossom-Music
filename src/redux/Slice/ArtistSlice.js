import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artist: null,
  name: null,
  email:null,
  artistToken: null,
  id: null,
  imgURL: null,
};

export const ArtistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setArtistLogin: (state, action) => {
      state.artist = action.payload.artist;
      state.name = action.payload.name;
      state.email = action.payload.email
      state.artistToken = action.payload.artistToken;
      state.id = action.payload.id;
      state.imgURL = action.payload.imgURL;
    },
    setArtistLogout: (state, action) => {
      state.artist = null;
      state.name = null;
      state.artistToken = null;
      state.id = null;
      state.imgURL = null;
    },
    setArtistImg: (state, action) => {
      state.imgURL = action.payload;
    },
  },
});

// export const { setArtistLogin, setArtistLogout, setArtistImg } = ArtistSlice.actions;
export const artistActions = ArtistSlice.actions;

export default ArtistSlice.reducer;