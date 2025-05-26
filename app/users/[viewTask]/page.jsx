"use client";

import Link from "next/link";
import styles from "@/css/viewtask.module.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskDetails({ params }) {
  const { viewTask } = params;
  const [task, setTask] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("storeTask");
    if (!raw) return;

    const tasks = JSON.parse(raw);
    const found = tasks.find((ct) => ct.id === viewTask);

    if (found) {
      setTask(found);
    } else {
      setTask(null); //instread of "return"
    }
  }, [viewTask]);

  useEffect(() => {
    const completedTasks = JSON.parse(
      localStorage.getItem("completedTask") || "[]"
    );

    setCompleted(completedTasks.find((t) => t.id === viewTask));
  }, [viewTask]);

  //   (!task) return <> no!, <p>! </>

  function handleSubmit(e) {
    e.preventDefault();

    if (!editTask.trim()) {
      alert("Task cannot be empty");
      return;
    }

    const raw = localStorage.getItem("storeTask");
    if (!raw) return;
    const tasks = JSON.parse(raw);

    const updatedTasks = tasks.map((t) =>
      t.id === viewTask ? { ...t, task: editTask } : t
    );

    // JOSN.parse(localStorage.setItem('StoreTask', updatedTask)).stringify
    localStorage.setItem("storeTask", JSON.stringify(updatedTasks));
    const updatedTask = updatedTasks.find((t) => t.id === viewTask);
    setTask(updatedTask);
    setIsEditing(false);
    toast.success("Task updated successfully");
  }

  function removeTask(e) {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("storeTask")) || [];
    const removedTaskList = [...tasks];
    const newTaskList = removedTaskList.filter((t) => t.id !== viewTask);
    localStorage.setItem("storeTask", JSON.stringify(newTaskList));

    toast.success("Task deleted.");

    setTask(null);
    setDeleteTask(true);
  }

  return (
    <>
      <ToastContainer />

      {deleteTask && (
        <div className={styles.deleteTask}>
          <p> Task Deleted Successfully! </p>
          <Link href="/taskmanagerpro" style={{ textDecoration: "underline" }}>
            Back to tasks
          </Link>
        </div>
      )}

      {!deleteTask && !task && (
        <div className={styles.tasknotfound}>
          <p>Task not found!</p>
          <Link href="/taskmanagerpro" style={{ textDecoration: "underline" }}>
            {" "}
            Back to tasks{" "}
          </Link>
        </div>
      )}

      {!deleteTask && task && (
        <div className={styles.showtask}>
          {" "}
          <button
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
          >
            {" "}
            Edit Task{" "}
          </button>
          <button onClick={removeTask}>Delete Task</button>
          {isEditing && (
            <form onSubmit={handleSubmit}>
              Edit task:{" "}
              <input
                type="text"
                value={editTask}
                placeholder={task.task}
                onChange={(e) => {
                  setEditTask(e.target.value);
                }}
                required
              />
              <input type="submit" value="Submit" />
            </form>
          )}
          <h1> View Task. </h1>
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", marginTop: "20px" }}
          >
            <tbody>
              <tr>
                <td>
                  <b>Task id:</b>
                </td>
                <td>{task.id}</td>
              </tr>
              <tr>
                <td>
                  <b>Task Date:</b>
                </td>
                <td>{task.date}</td>
              </tr>
              <tr>
                <td>
                  <b>Task Time:</b>
                </td>
                <td>{task.time}</td>
              </tr>
              <tr>
                <td>
                  <b>Task:</b>
                </td>
                <td>{task.task}</td>
              </tr>
              <tr>
                <td>
                  <b> Task Completed </b>
                </td>
                <td>{completed ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
          <Link href="/taskmanagerpro" style={{ textDecoration: "underline" }}>
            Back to tasks
          </Link>
        </div>
      )}
    </>
  );
}
