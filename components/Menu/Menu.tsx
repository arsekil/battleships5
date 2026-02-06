"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/menu.module.css";

export default function Menu() {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	}

	const handleMouseLeave = () => {
		setIsExpanded(false);
	}
	return (
		<menu className={styles.menu}>
			<div className={styles.container} onMouseEnter={handleMouseEnter}>
				{!isExpanded && <Image src={"/favicon.svg"} width={50} height={50} alt="ship" unoptimized />}
			</div>
			{isExpanded && <div className={styles.expandingMenu} onMouseLeave={handleMouseLeave} >
				<div className={styles.expandedMenuStart}></div>
				<p>Expanded Menu</p>
				<div className={styles.expandedMenuEnd}>
					<Image src={"/favicon.svg"} width={50} height={50} alt="ship" unoptimized />
				</div>
			</div>}
		</menu>
	)
}