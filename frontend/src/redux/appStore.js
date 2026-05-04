import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";


const store = configureStore({
  reducer: {user: userReducer},
  reducer: { feed: feedReducer},
})

export default store;