import React, { FC, ReactNode } from "react";
import { Navigation } from "../Navigation/Navigation";
import styles from "./layout.module.css";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className={styles.layout}>
      <Navigation />

      {children}
    </section>
  );
};
