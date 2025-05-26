'use client';

import React, { useEffect, useState } from "react";

export default function TaskManage({ params }) {
  const { currentTask } = params;
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("storeTask")) || [];
    const foundTask = savedTasks.find((t) => t.id === currentTask);
    setTaskDetails(foundTask);
  }, [currentTask]);

  if (!taskDetails) return <p>Task not found.</p>;

  return (
    <>
      <h1>View current Task: {currentTask}</h1>
      <p>Date: {taskDetails.date}</p>
      <p>Time: {taskDetails.time}</p>
      <p>Task: {taskDetails.task}</p>
    </>
  );
}
