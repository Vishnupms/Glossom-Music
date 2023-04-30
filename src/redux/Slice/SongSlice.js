import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    song: []
   
};

export const SongSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload.songs;
      
    },
 
  },
});

// export const { song } = SongSlice.actions;
export const songActions = SongSlice.actions;

export default SongSlice.reducer;