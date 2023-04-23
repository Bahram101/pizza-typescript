import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (accum, current) => accum + current.count * current.price,
        0
      );
      state.totalCount = state.items.reduce(
        (accum, current) => accum + current.count,
        0
      );
    },
    minusItem(state, action) {
      console.log("minus");
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem.count > 1) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce(
        (accum, current) => accum + current.count * current.price,
        0
      );
      state.totalCount = state.items.reduce(
        (accum, current) => accum + current.count,
        0
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (accum, current) => accum + current.count * current.price,
        0
      );
      state.totalCount = state.items.reduce(
        (accum, current) => accum + current.count,
        0
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearItems, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
