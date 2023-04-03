import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    song: null,
    songUrl: "",
    imageUrl: "",
};

export const SongSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload.songs;
      
    },
    setSongUrl: (state, action)  => {
      state.songUrl = action.payload;
    },
    setImageUrl: (state, action)  => {
      state.imageUrl = action.payload;
    }
  },
});

// export const { song } = SongSlice.actions;
export const songActions = SongSlice.actions;

export default SongSlice.reducer;