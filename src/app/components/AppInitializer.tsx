"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/authSlice";

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch("http://localhost:4000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) return;

        const json = await res.json();

        console.log(json);

        dispatch(setUser(json));
      } catch (err) {
        console.error("Failed to check login:", err);
      }
    };

    checkLoggedIn();
  }, [dispatch]);

  return <>{children}</>;
}
