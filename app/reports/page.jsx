// app/reports/page.jsx
"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "@/css/createtask.module.css";

export default function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const isReported = localStorage.getItem("report"); //no value cause .value takes in only string and numbers doesn't take in objects
    if (isReported && !sessionStorage.getItem("showed")) {
      alert("Already Reported");
      sessionStorage.setItem("showed", true);
    }
  }, []);

  function Getreports(event) {
    event.preventDefault(); //avoids reload

    const uemail = document.getElementById("uemail").value;
    const uname = document.getElementById("uname").value;
    const usubject = document.getElementById("usubject").value;
    const ucomment = document.getElementById("ucomment").value;

    let userReport = [
      {
        Email: uemail,
        uname: uname,
        subject: usubject,
        comment: ucomment,
      },
    ];

    localStorage.setItem("report", JSON.stringify(userReport));
    setReports(userReport);
    alert("Report recivied");

    window.location.href = "/thankyou";
  }

  return (
    <div>
      <h1>Contact us</h1>
      <form onSubmit={Getreports}>
        <label style={{
  display: "block",
  marginbottom: "12px",
  color: "#555",
  fontweight: "bold"
}}>
          Email:
          <input
            type="email"
            placeholder="example@mail.com"
            required
            id="uemail"
          />
        </label>
        <br />
        <label>
          Name:
          <input type="text" placeholder="Joe Doe" required id="uname" />
        </label>
        <br />
        <label>
          Subject:
          <input
            type="text"
            placeholder="What's the issue?"
            required
            id="usubject"
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            placeholder="Describe the issue... "
            id="ucomment"
          ></textarea>
        </label>
        <br />
        <input type="submit" value="submit" />
          
      </form>
    </div>
  );
}
