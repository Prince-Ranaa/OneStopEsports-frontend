"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { AppInitializer } from "./components/AppInitializer"; // Create this file

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
