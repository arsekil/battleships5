"use client";

import React from "react";
import Link from "next/link";
import Icon from "@mdi/react";

interface SliceDataProps {
	name: string;
	link: string;
	icon: string;
	label: string;
}

export default function Slice({
	data,
	sliceOne,
	sliceTwo,
	hoveredItem,
	setHoveredItem,
	styles
}: {
	data: SliceDataProps[],
	sliceOne: number,
	sliceTwo?: number,
	hoveredItem: string | null,
	setHoveredItem: (item: string | null) => void,
	styles: { menuitem: string, menuItemLink: string, menuItemText: string }
}) {
	return (
		<>
			{data.slice(sliceOne, sliceTwo).map((item: SliceDataProps) => (
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
		</>
	)
}