import Link from "next/link";
import React from "react";

export default function Thankyou() {
  return (
    <>
      <h1>Thank you for letting us know!</h1>
      <nav>
        <Link href="/"> Back to home </Link>
      </nav>
    </>
  );
}
