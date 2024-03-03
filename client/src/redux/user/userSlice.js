import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
     ;
    },
    deleteUserSuccess:(state)=>{
      state.currentUser=null;

    },
    signOutSuccess:(state)=>{
      state.currentUser=null
    }
   
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  deleteUserSuccess,
  signOutSuccess,
  updateUserSuccess,
  updateUserStart,
} = userSlice.actions;
export default userSlice.reducer;
