"use client";

import React from "react";
import styles from "@/styles/error.module.css";

export default function Error({ error }: { error: Error }) {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>Something went wrong while attempting to create your Player!</h2>
      <p className={styles.errorMessage}>{error.message}</p>
    </div>
  );
}