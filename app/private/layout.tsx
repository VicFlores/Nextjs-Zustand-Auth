"use client";

import { useAuthStore } from "@/stores";
import { usePathname, redirect } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const authStatus = useAuthStore((state) => state.status);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  // Authentication
  if (authStatus === "pending") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (authStatus === "authorized" && !token && !user) {
    checkAuthStatus();
    return redirect("/login");
  }

  if (authStatus === "unauthorized") return redirect("/login");

  // Authorization
  if (user?.roles.includes("admin") && pathname.startsWith("/private/admin"))
    return <>{children}</>;

  if (user?.roles.includes("user") && pathname.startsWith("/private/user"))
    return <>{children}</>;

  if (user?.roles.includes("super") && pathname.startsWith("/private/super"))
    return <>{children}</>;

  return redirect("/login");
}
