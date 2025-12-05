"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({ children }: {children: ReactNode}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/chat");
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;

  return <>{children}</>;
}
