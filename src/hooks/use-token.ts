"use client";

import { useEffect, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return { token };
};
