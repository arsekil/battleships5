"use client";

import React from "react";
import Icon from "@mdi/react";

interface SliceDataProps {
  name: string;
  link: string;
  icon: string;
  label: string;
}

export default function SliceWithLogout({
  data,
  sliceOne,
  sliceTwo,
  hoveredItem,
  setHoveredItem,
  styles,
  signOut
}: {
  data: SliceDataProps[],
  sliceOne: number,
  sliceTwo?: number,
  hoveredItem: string | null,
  setHoveredItem: (item: string | null) => void,
  styles: { menuitem: string, menuItemLink: string, menuItemText: string },
  signOut: ({ redirectUrl }: { redirectUrl: string }) => void
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
          {item.name === "logout" ?
            <a href={item.link} onClick={() => signOut({ redirectUrl: '/' })} className={styles.menuItemLink}>
              <Icon path={item.icon} size={1} />
              {hoveredItem === item.name && (
                <p className={styles.menuItemText}>{item.label}</p>
              )}
            </a>
            :
            <a href={item.link} className={styles.menuItemLink}>
              <Icon path={item.icon} size={1} />
              {hoveredItem === item.name && (
                <p className={styles.menuItemText}>{item.label}</p>
              )}
            </a>}
        </li>
      ))}
    </>
  )
}