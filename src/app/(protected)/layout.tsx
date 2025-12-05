"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProtectedLayout({ children }: {children: ReactNode}) {
//   const router = useRouter();
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("You must sign in first!");
//       router.push("/auth/sign-in");
//     } else {
//       setChecked(true);
//     }
//   }, []);

//   if (!checked) return null;

  return <>{children}</>;
}
