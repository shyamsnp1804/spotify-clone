import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    currentSong: null,
    isPlaying: false,
    shuffle: false,
    history: [],
  },
  reducers: {
    addSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    playAndPause: (state) => {
      if (state.isPlaying) {
        state.isPlaying = false;
        return;
      }
      state.isPlaying = true;
    },
    toggleshuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    removeFromHistory: (state) => {
      state.history.pop();
    },
  },
});

export const { addSong, playAndPause, toggleshuffle, addToHistory ,  removeFromHistory } =
  songSlice.actions;

export default songSlice.reducer;
