import Link from "next/link";
import React from "react";
import style from "@/css/header.module.css";

export default function HeaderComponent() {
  return (
    <header className={style.header}>
      <div className={style.header_logo}>
        <Link href="/taskmanagerpro">
          <h1>Task Manager Pro</h1>
        </Link>
      </div>
      <nav className={style.header_nav}>
        <div className={style.header_menu}>
          <Link href="/">
            <h2>Home</h2>
          </Link>
          <Link href="/taskmanagerpro">
            <h2>Task Manager</h2>
          </Link>
          <Link href="/aboutus">
            <h2>About Us</h2>
          </Link>
          <Link href="/contactus">
            <h2>Contact Us</h2>
          </Link>
        </div>
      </nav>
    </header>

    
  );
}
