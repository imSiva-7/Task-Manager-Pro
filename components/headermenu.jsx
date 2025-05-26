import Link from 'next/link'
import React from 'react'
import "@/css/headermenu.css";

export default function headermenu() {
  return (
   
    <>
<div className='Container'>
    <ul>
        <li>
            <Link href="/taskmanagerpro" >Task Manager</Link>
        </li>
        <li>
            <Link href="/findmecar" >Find Me Car</Link>
        </li>
    </ul>
</div>

    </>
  )
}
