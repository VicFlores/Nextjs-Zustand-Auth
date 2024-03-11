"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores";
import styles from "./navigation.module.css";

export const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  return (
    <nav className={styles.navigation}>
      {/* <ul>
        <Link href={"/"}>Home</Link>
        <Link href={"/private/admin"}>Admin</Link>
        <Link href={"/private/super"}>Super Admin</Link>
        <Link href={"/private/user"}>User</Link>
        <Link href={"/login"}>Login</Link>
        <button onClick={logoutUser}>Logout</button>
      </ul> */}

      <ul>
        <Link href={"/"}>Home</Link>

        {user?.roles.includes("admin") && (
          <Link href={"/private/admin"}>Admin</Link>
        )}

        {user?.roles.includes("super") && (
          <Link href={"/private/super"}>Super Admin</Link>
        )}

        {user?.roles.includes("user") && (
          <Link href={"/private/user"}>User</Link>
        )}

        {user ? (
          <button onClick={logoutUser}>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </ul>
    </nav>
  );
};
