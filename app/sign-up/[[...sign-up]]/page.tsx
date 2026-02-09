"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import styles from "@/styles/auth.module.css";

export default function Page() {
	return (
		<div className={styles.container}>
			<SignUp />
		</div>
	);
}