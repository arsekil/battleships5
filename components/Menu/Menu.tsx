"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
// import { useConvexAuth } from "convex/react";
import Icon from "@mdi/react";
import {
	mdiBillboard,
	mdiLifebuoy,
	mdiEmailOutline,
	mdiLogin,
	mdiLogout,
	mdiAccountPlusOutline,
	mdiAccountCircleOutline,
	mdiChatOutline
} from "@mdi/js";
import styles from "@/styles/menu.module.css";

// TODO - change isSignedIn to isAuthenticated and remove useAuth from this component, only useConvexAuth 
export default function Menu() {
	const { isSignedIn, signOut } = useAuth();
	// const { isAuthenticated } = useConvexAuth();

	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

	const handleStart = () => {
		setIsExpanded(true);
	}

	const handleEnd = () => {
		setIsExpanded(false);
	}

	const items = [
		{ name: "login", link: "/sign-in", icon: mdiLogin, label: "Login" },
		{ name: "signup", link: "/sign-up", icon: mdiAccountPlusOutline, label: "Sign Up" },
		{ name: "logout", link: "#", icon: mdiLogout, label: "Log Out" },
		{ name: "account", link: "/account", icon: mdiAccountCircleOutline, label: "Account" },
		{ name: "lobby", link: "/lobby", icon: mdiChatOutline, label: "Lobby" },
		{ name: "leaderboard", link: "/leaderboard", icon: mdiBillboard, label: "LeaderBoard" },
		{ name: "support", link: "/support", icon: mdiLifebuoy, label: "Support" },
		{ name: "contact", link: "/contact", icon: mdiEmailOutline, label: "Contact" },
	]

	return (
		<menu className={styles.menu}>
			<div className={styles.expandedMenuStart} onMouseEnter={handleStart}>
				<Link href="/" className={styles.menuItemLink}>
					<Image src={"/lighthouse.png"} width={70} height={70} alt="lighthouse" unoptimized />
				</Link>
			</div>
			{isExpanded &&
				<div className={styles.expandingMenu} onMouseLeave={handleEnd}>
					<ul className={styles.verticalMenu}>
						{!isSignedIn &&
							items.slice(0, 2).map((item: { name: string, link: string, icon: string, label: string }, idx: number) => (
								<li
									key={item.name}
									className={styles.menuitem}
									onMouseEnter={() => setHoveredItem(item.name)}
									onMouseLeave={() => setHoveredItem(null)}
								>
									<Link href={item.link} className={styles.menuItemLink}>
										<Icon path={item.icon} size={1} />
										{hoveredItem === item.name && (
											<p className={styles.menuItemText}>{item.label}</p>
										)}
									</Link>
								</li>
							))}
						{isSignedIn &&
							items.slice(2, 5).map((item: { name: string, link: string, icon: string, label: string }, idx: number) => (
								<li
									key={item.name}
									className={styles.menuitem}
									onMouseEnter={() => setHoveredItem(item.name)}
									onMouseLeave={() => setHoveredItem(null)}
								>
									{item.name === "logout" ?
										<Link href={item.link} onClick={() => signOut({ redirectUrl: '/' })} className={styles.menuItemLink}>
											<Icon path={item.icon} size={1} />
											{hoveredItem === item.name && (
												<p className={styles.menuItemText}>{item.label}</p>
											)}
										</Link>
										:
										<Link href={item.link} className={styles.menuItemLink}>
											<Icon path={item.icon} size={1} />
											{hoveredItem === item.name && (
												<p className={styles.menuItemText}>{item.label}</p>
											)}
										</Link>}
								</li>
							))}
						{items.slice(5).map((item: { name: string, link: string, icon: string, label: string }, idx: number) => (
							<li
								key={item.name}
								className={styles.menuitem}
								onMouseEnter={() => setHoveredItem(item.name)}
								onMouseLeave={() => setHoveredItem(null)}
							>
								<Link href={item.link} className={styles.menuItemLink}>
									<Icon path={item.icon} size={1} />
									{hoveredItem === item.name && (
										<p className={styles.menuItemText}>{item.label}</p>
									)}
								</Link>
							</li>
						))}
					</ul>
					<div className={styles.expandedMenuEnd}>
						<Image src={"/ship.svg"} width={70} height={70} alt="ship" unoptimized />
					</div>
				</div>}
		</menu>
	)
}