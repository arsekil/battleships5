"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
// import { useConvexAuth } from "convex/react";

import lighthouse from "../../public/lighthouse.png";
import ship from "../../public/ship.svg";

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
import styles from "./../../styles/menu.module.css";

import Slice from "./_components/Slice";
import SliceWithLogout from "./_components/SliceWithLogout";

type StyleProps = {
	menuitem: string;
	menuItemLink: string;
	menuItemText: string;
}

// TODO - change isSignedIn to isAuthenticated and remove useAuth from this component, only use useConvexAuth 
export default function Menu() {
	const { isSignedIn, signOut } = useAuth();
	// const { isAuthenticated, isLoading } = useConvexAuth();

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
				<a href="/" className={styles.menuItemLink}>
					<Image src={lighthouse} width={70} height={70} alt="lighthouse" loading="eager" unoptimized />
				</a>
			</div>
			{isExpanded &&
				<div className={styles.expandingMenu} onMouseLeave={handleEnd}>
					<ul className={styles.verticalMenu}>
						{!isSignedIn &&
							<Slice
								data={items}
								sliceOne={0}
								sliceTwo={2}
								hoveredItem={hoveredItem}
								setHoveredItem={setHoveredItem}
								styles={styles as StyleProps}
							/>}
						{isSignedIn &&
							<SliceWithLogout
								data={items}
								sliceOne={2}
								sliceTwo={5}
								hoveredItem={hoveredItem}
								setHoveredItem={setHoveredItem}
								styles={styles as StyleProps}
								signOut={signOut}
							/>}
						<Slice
							data={items}
							sliceOne={5}
							hoveredItem={hoveredItem}
							setHoveredItem={setHoveredItem}
							styles={styles as StyleProps}
						/>
					</ul>
					<div className={styles.expandedMenuEnd}>
						<Image src={ship} width={70} height={70} alt="ship" loading="eager" unoptimized />
					</div>
				</div>}
		</menu>
	)
}