"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function SyncUser() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    (async () => {
      const token = await getToken({ skipCache: true });
      if (!token) return;

      await fetch("http://localhost:3000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
    })();
  }, [isSignedIn, getToken]);

  return null;
}
