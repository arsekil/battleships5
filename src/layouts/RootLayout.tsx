"use client";

import React from "react";
import Menu from "../components/Menu/Menu";

export default function RootLayout() { 
  return (
    <div className="naval">
      <nav className="nav">
        <Menu />
      </nav>
      <section className="container">
        <section className="children">
        </section>
      </section>
    </div>
  )
}