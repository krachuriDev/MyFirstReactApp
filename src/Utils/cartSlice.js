import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Redux Toolkit uses immerJS behind the scenes.
      // mutating the state here directly.
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    //originalState = {items: ["pizza"]}
    clearCart: (state, action) => {
      //RTK - either Mutate/Change the existing  state or return a new State
       //state.items.length = 0; // originalState = []

      return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    },
  },
});

//cartSlice object contains actions & reducer properties.

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
