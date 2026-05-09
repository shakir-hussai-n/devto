import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import friendReducer from "./friendsSlice";

const store = configureStore({
  reducer: { user: userReducer, feed: feedReducer, friends: friendReducer },
});

export default store;
