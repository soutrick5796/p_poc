import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: "",
  panCode: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    setPanCode: (state, action) => {
      state.panCode = action.payload;
    },
    logout: (state) => {
      state.userId = null;
      state.userName = "";
      state.panCode = "";
    },
  },
});

export const { setUser, setPanCode, logout } = userSlice.actions;
export default userSlice.reducer;
