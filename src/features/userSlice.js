import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
