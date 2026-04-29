// TODO implement admin panel for uploading and managing images, videos, and other media files. 
// TODO This will likely involve creating a form for uploading files, as well as a dashboard for viewing and managing existing media. 
// TODO Additionally, we may want to implement authentication and authorization to restrict access to the admin panel to authorized users only.

"use client";

import React from "react";
import styles from "../../styles/admin.module.css";
import { useUser } from "@clerk/nextjs";

export default function Page() { 
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <h1>Admin Panel</h1>
      <p>Welcome, {user?.username}!</p>
    </div>
  )
}