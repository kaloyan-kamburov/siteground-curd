import { createSlice } from "@reduxjs/toolkit";

type ErrorInitialState = {
  error: {
    message: string | null;
  };
};

const errorSlice = createSlice({
  name: "error",
  initialState: { message: null },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload;
    },
    clearError: (state) => {
      state.message = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state: ErrorInitialState) => state.error.message;
export default errorSlice.reducer;
