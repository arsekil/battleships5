"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import styles from "../../styles/onboarding.module.css";

// TODO design player creation flow and push data into Convex
export default function Onboarding() {
	const { user } = useUser();
	return (
		<div className={styles.container}>
			
		</div>
	);
}