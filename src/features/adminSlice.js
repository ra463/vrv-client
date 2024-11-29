import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    notes: [],
    users: [],
  },
  reducers: {
    setAdminUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setAdminNotes: (state, action) => {
      state.notes = action.payload.notes;
    },
  },
});

export const { setAdminUsers, setAdminNotes } = adminSlice.actions;
export default adminSlice.reducer;
