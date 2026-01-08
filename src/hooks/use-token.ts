"use client";

import { useEffect, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsReady(true);
  }, []);

  return { token, isReady };
};
