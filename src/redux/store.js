import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    filter: filterReducer,
  },
});
