import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  name: null,
  token: null,
  id: null,
  email:null,
  ImgURL: null,
};

export const  UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.name
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.ImgURL = action.payload.ImgURL;
    },
    setUserLogout: (state) => {
      state.user = null;
      state.name = null;
      state.token = null;
      state.id = null;
      state.ImgURL = null;
    },
    setUserImg: (state, action) => {
      state.ImgURL = action.payload.ImgURL
    },
    setUserName:(state, action)=>{
      state.name = action.payload.name
    }
  },
});


export const userActions = UserSlice.actions;

export default UserSlice.reducer;