import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "../fetures/fileSlice";

//creating redux store object..
const store = configureStore({
  reducer: {
    fileSliceStore: fileSlice,
  },
});

export default store;
