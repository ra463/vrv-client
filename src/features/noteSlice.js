import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: {},
    notes: [],
  },
  reducers: {
    setNote: (state, action) => {
      state.note = action.payload.note;
    },
    setNotes: (state, action) => {
      state.notes = action.payload.notes;
    },
  },
});

export const { setNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
