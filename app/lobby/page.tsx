"use client";

import React from "react";
import styles from "@/styles/lobby.module.css";

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.lobby}>
				<div className={styles.messageList}>Display message here</div>
				<div className={styles.messenger}>Send message here</div>
			</div>
			<div className={styles.players}>Online players list</div>
			<div className={styles.panel}>Command panel</div>
		</div>
	);
}