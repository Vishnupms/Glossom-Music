import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: [],
  currentSongs: [],
  currentIndex: 0,
  isActive:false,
  isPlaying:false,
  activeSong:{},


};


export const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    
    setSong: (state, action) => {
      state.data = action.payload.songs;
      
    },
  
    setActiveSong:(state,action)=>{
    state.activeSong = action.payload.activeSong;
    state.currentSongs = action.payload.currentSongs;
    state.currentIndex = action.payload.currentIndex;  
    state.isActive = true;
    },

    nextSong: (state, action) => {
      state.activeSong = state.currentSongs[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },
    prevSong: (state, action) => {
      state.activeSong = state.currentSongs[action.payload]
      state.currentIndex = action.payload;
      state.isActive = true;
    },
    
    playPause: (state, action) => {
    state.isPlaying = action.payload;
    },
  },
});

// export const { song } = SongSlice.actions;
export const playerActions = PlayerSlice.actions;

export default PlayerSlice.reducer;