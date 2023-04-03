import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  name: null,
  token: null,
  id: null,
  email: null,
  pic:null
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.user;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.pic = action.payload.profilepic;

    },
    setLogout: (state) => {
      state.user = null;
      state.name = null;
      state.token = null;
      state.id = null;
      state.email = null;
      state.pic = null;
    },
    setUserImg: (state, action) => {
      state.pic = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload.name
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;