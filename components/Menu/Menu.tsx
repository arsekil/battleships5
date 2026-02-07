"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Icon from "@mdi/react";
import { 
	mdiBillboard,
	mdiLifebuoy,
	mdiEmailOutline,
	mdiLogin,
	mdiLogout,
	mdiAccountPlusOutline,
	mdiAccountCircleOutline
} from "@mdi/js";
import styles from "@/styles/menu.module.css";

export default function Menu() {
	const { isSignedIn, signOut, isLoaded } = useAuth();

	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	}

	const handleMouseLeave = () => {
		setIsExpanded(false);
	}

	const items = [
		{ name: "login", 	   link: "/sign-in",     icon: mdiLogin,                label: "Login" },
		{ name: "signup",      link: "/sign-up",     icon: mdiAccountPlusOutline,   label: "Sign Up" },
		{ name: "logout",      link: "#",            icon: mdiLogout,               label: "Log Out" },
		{ name: "account",     link: "/account",     icon: mdiAccountCircleOutline, label: "Account" },
    	{ name: "leaderboard", link: "/leaderboard", icon: mdiBillboard,            label: "LeaderBoard" },
    	{ name: "support",     link: "/support",     icon: mdiLifebuoy,             label: "Support" },
    	{ name: "contact",     link: "/contact",     icon: mdiEmailOutline,         label: "Contact" },
  	]

	return (
		<menu className={styles.menu}>
			<div className={styles.container} onMouseEnter={handleMouseEnter}>
				{!isExpanded && <Image src={"/ship.svg"} width={50} height={50} alt="ship" unoptimized />}
			</div>
			{isExpanded && 
				<div className={styles.expandedMenuStart}>
					<Link href="/" className={styles.menuItemLink}>
					 	<Image src={"/lighthouse.png"} width={50} height={50} alt="lighthouse" unoptimized/>
					</Link>
				</div>
			}
			{isExpanded && <div className={styles.expandingMenu} onMouseLeave={handleMouseLeave} >
				<ul className={styles.horizontalMenu}>
					{isLoaded && !isSignedIn && 
						items.slice(0,2).map((item: {name: string, link: string, icon: string, label: string}, idx: number) => (
						<li
      						key={item.name}
      						className={styles.menuitem}
    					>
    						<Link href={item.link} className={styles.menuItemLink}>
      							<Icon path={item.icon} size={1} />
        						<p className={styles.menuItemText}>{item.label}</p>
      						</Link>
    					</li>
					))}
					{isLoaded && isSignedIn && 
						items.slice(2,4).map((item: {name: string, link: string, icon: string, label: string}, idx: number) => (
						<li
      						key={item.name}
      						className={styles.menuitem}
    					>
    						{item.name === "logout" ? 
    						<Link href={item.link} onClick={() => signOut('/')} className={styles.menuItemLink}>
      							<Icon path={item.icon} size={1} />
        						<p className={styles.menuItemText}>{item.label}</p>
      						</Link>
      						:
      						<Link href={item.link} className={styles.menuItemLink}>
      							<Icon path={item.icon} size={1} />
        						<p className={styles.menuItemText}>{item.label}</p>
      						</Link>
      						}
    					</li>
					))}
					{items.slice(4).map((item: {name: string, link: string, icon: string, label: string}, idx: number) => (
    					<li
      						key={item.name}
      						className={styles.menuitem}
    					>
    						<Link href={item.link} className={styles.menuItemLink}>
      							<Icon path={item.icon} size={1} />
        						<p className={styles.menuItemText}>{item.label}</p>
      						</Link>
    					</li>
  					))}
				</ul>
				<ul className={styles.verticalMenu}>
					{isLoaded && !isSignedIn && 
						items.slice(0,2).map((item: {name: string, link: string, icon: string, label: string}, idx: number) => (
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
					{isLoaded && isSignedIn && 
						items.slice(2,4).map((item: {name: string, link: string, icon: string, label: string}, idx: number) => (
					<li
      						key={item.name}
      						className={styles.menuitem}
      						onMouseEnter={() => setHoveredItem(item.name)}
      						onMouseLeave={() => setHoveredItem(null)}
    					>
    						{item.name === "logout" ? 
    						<Link href={item.link} onClick={() => signOut('/')} className={styles.menuItemLink}>
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
					{items.slice(4).map((item: {name: string, link: string, icon: string, label: string}, idx: number) => (
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
					<Image src={"/ship.svg"} width={50} height={50} alt="ship" unoptimized />
				</div>
			</div>}
		</menu>
	)
}