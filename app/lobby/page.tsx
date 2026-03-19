"use client";

import React from "react";
import styles from "../../styles/lobby.module.css";

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.lobby}>
				<div className={styles.lobby_message_list}>Display message here</div>
				<div className={styles.lobby_messenger}>Send message here</div>
			</div>
			<div className={styles.players}>
				<div className={styles.players_title}>Online Players</div>
				<div className={styles.players_list}>List</div>
			</div>
			<div className={styles.panel}>
				<div className={styles.panel_title}>Command Panel</div>
				<div className={styles.panel_panel}>panel</div>
			</div>
		</div>
	);
}