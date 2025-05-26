"use client";

import Link from "next/link";
import React, { useState } from "react";
import style from "@/css/header.module.css";

export default function MenuNavBar() {
  const [showmenu, setShowmenu] = useState(false);

  function toggleMenu() {
    setShowmenu((prev) => !prev);
  }
  function closeMenu() {
    setShowmenu(false);
  }
  return (
    <>
      <header className={style.header}>
        <button
          onClick={toggleMenu}
          className={`${style.button_options}  ${showmenu ? style.close : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>{" "}
        <div className={`${style.menu_bar} ${showmenu ? style.active : ""}`}>
          <ul className={style.menu_ul}>
            <li onClick={closeMenu}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/taskmanagerpro">Task Manager Pro</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/reports">Report a bug</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/aboutus">About Us</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/termsofuse">Terms & Condition</Link>
            </li>
          </ul>
        </div>
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
          </div>
        </nav>
      </header>
      
    </>
  );
}
