"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	}

	const handleMouseLeave = () => {
		setIsExpanded(false);
	}

	const items = [
		{ name: "login", 	   link: "/sign-in",   icon: mdiLogin,              label: "Login" },
		{ name: "signup",      link: "/sign-up",   icon: mdiAccountPlusOutline, label: "Sign Up"},
    	{ name: "leaderboard", link: "/leaderboard", icon: mdiBillboard,          label: "LeaderBoard" },
    	{ name: "support",     link: "/support",   icon: mdiLifebuoy,           label: "Support" },
    	{ name: "contact",     link: "/contact",   icon: mdiEmailOutline,       label: "Contact" },
  	]

	return (
		<menu className={styles.menu}>
			<div className={styles.container} onMouseEnter={handleMouseEnter}>
				{!isExpanded && <Image src={"/ship.svg"} width={50} height={50} alt="ship" unoptimized />}
			</div>
			{isExpanded && 
				<div className={styles.expandedMenuStart}>
					 <Image src={"/lighthouse.png"} width={50} height={50} alt="lighthouse" unoptimized/>
				</div>
			}
			{isExpanded && <div className={styles.expandingMenu} onMouseLeave={handleMouseLeave} >
				<ul className={styles.horizontalMenu}>
					<li className={styles.menuitem}>
						<Link href="/sign-in" className={styles.menuItemLink}>
							<Icon path={mdiLogin} size={1} />
							Login
						</Link>
					</li>
					<li className={styles.menuitem}>
						<Link href="/sign-up" className={styles.menuItemLink}>
							<Icon path={mdiAccountPlusOutline} size={1} />
							Sign Up
						</Link>
					</li>
					<li className={styles.menuitem}>
						<Icon path={mdiBillboard} size={1} />
						LeaderBoard
					</li>
					<li className={styles.menuitem}>
						<Icon path={mdiLifebuoy} size={1} />
						Support
					</li>
					<li className={styles.menuitem}>
						<Icon path={mdiEmailOutline} size={1} />
						Contact
					</li>
				</ul>
				<ul className={styles.verticalMenu}>
					{items.map((item) => (
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