import {createSlice} from "@reduxjs/toolkit";


const friendSlice = createSlice({
  name:"friends",
  initialState: null,
  reducers: {
    addFriends: (state,action)=>{
      return action.payload
    },
    removeFriends: (state,action) =>{
      return null
    }
  }
});

export const {addFriends,removeFriends} = friendSlice.actions;

export default friendSlice.reducer;