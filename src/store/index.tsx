import { configureStore } from "@reduxjs/toolkit";
import tournamentReducer from "./features/tournamentSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    tournament: tournamentReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
