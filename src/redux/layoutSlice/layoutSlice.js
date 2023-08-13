import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullScreen: false,
  sideBar: window.innerWidth > 1366 ? true : false,
  showCards: true,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleFullScreen: (state) => {
      state.fullScreen = !state.fullScreen;
    },
    toggleSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    toggleCards: (state, action) => {
      state.showCards = action.payload;
    },
  },
});

export const { toggleFullScreen, toggleSideBar, toggleCards } =
  layoutSlice.actions;
export default layoutSlice.reducer;
