// store/features/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  _id: string;
  email: string;
  role: string;
  availableBalance: number;
  withdrawableBalance: number;
}

interface AuthState {
  user: UserType | any;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
