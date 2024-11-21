import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lang: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.lang = state.lang === "en" ? "id" : "en";
    },
  },
});
export const { toggleLang } = langSlice.actions;
export default langSlice.reducer;