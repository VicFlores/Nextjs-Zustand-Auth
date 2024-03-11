"use client";

import { useAuthStore } from "@/stores";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

type LoginProps = {
  email: { value: string };
  password: { value: string };
};

export const Login = () => {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.loginUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.target as typeof event.target &
      LoginProps;

    try {
      await loginUser(email.value, password.value);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form className={styles.login__form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" />

        <input type="password" placeholder="Password" name="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
