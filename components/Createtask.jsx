"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "../css/createtask.module.css";
import Link from "next/link";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [everyTask, setEveryTask] = useState([]);
  const [notCompleted, setNotCompleted] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  let i = 0;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("storeTask")) || [];
    setTasks(savedTask);
    setEveryTask(savedTask);
  }, []);

  // Load completed tasks from localStorage
  useEffect(() => {
    const completedTaskData = localStorage.getItem("completedTask");
    try {
      setCompletedTasks(JSON.parse(completedTaskData ?? "[]"));
    } catch (error) {
      console.error("Error parsing completed tasks:", error);
      setCompletedTasks([]);
    }
  }, []);

  // Compute not-completed tasks
  useEffect(() => {
    const completedIds = completedTasks.map((task) => task.id);
    const incompleteTasks = tasks.filter(
      (task) => !completedIds.includes(task.id)
    );
    setNotCompleted(incompleteTasks);
  }, [tasks, completedTasks]);

  // Create new task
  function createTask(e) {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    if (date && time && task) {
      const newTask = { id: uuidv4(), date, time, task };
      const updatedTasks = [...tasks, newTask];
      const updatedEveryTask = [...everyTask, newTask];

      localStorage.setItem("storeTask", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setEveryTask(updatedEveryTask);
      toast.success("Task created successfully");

      setDate("");
      setTime("");
      setTask("");
    }
  }

  // Remove selected tasks
  function removeTask(e) {
    e.preventDefault();

    if (selectedTasks.length <= 0) {
      alert("No task selected!");
      return;
    }

    const updatedTasks = tasks.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    localStorage.setItem("storeTask", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setSelectedTasks([]);
    toast.success("Task removed successfully");
  }

  // Toggle task selection
  function toggleSelectTask(taskId) {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  }

  // Mark selected tasks as completed
  function finishedTask(e) {
    e.preventDefault();

    if (selectedTasks.length <= 0) {
      alert("Select a task!");
      return;
    }

    const prevCompletedTasks = JSON.parse(
      localStorage.getItem("completedTask") || "[]"
    );
    const prevCompletedIds = prevCompletedTasks.map((t) => t.id);

    const newlyCompleted = everyTask.filter(
      (t) => selectedTasks.includes(t.id) && !prevCompletedIds.includes(t.id)
    );

    const updatedCompleted = [...prevCompletedTasks, ...newlyCompleted];

    localStorage.setItem("completedTask", JSON.stringify(updatedCompleted));
    setCompletedTasks(updatedCompleted);
    setSelectedTasks([]);
    toast.success("Task marked as completed");
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.form_title_row}>
        <div className={styles.body}>
          <form className={styles.form_task} onSubmit={createTask}>
            <label className={styles.form_group}>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className={styles.form_group}>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <label className={styles.form_group}>Task: </label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add Task..."
              required
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  document.querySelector("form").requestSubmit();
                }
              }}
            />
            <div className={styles.button_row}>
              <input type="submit" value="Create Task!" />
              <button onClick={finishedTask} className={styles.finish_button}>
                Mark as Done
              </button>
              <button onClick={removeTask} className={styles.remove_button}>
                Remove
              </button>
            </div>
          </form>
        </div>

        <div className={styles.task_list_container}>
          {notCompleted.length > 0 ? (
            <ul className={styles.task_list}>
              <h2 className={styles.h2_title1}>
                {notCompleted.length == 1 ? "Task" : "Tasks"}
              </h2>
              {notCompleted.map((mtask) => (
                <div key={mtask.id}>
                  <li className={styles.task_list_item}>
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(mtask.id)}
                      onChange={() => toggleSelectTask(mtask.id)}
                      aria-label={`Select task ${mtask.task}`}
                    />
                    <Link
                      href={`/users/${mtask.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      Date: {mtask.date}, Time: {mtask.time}, Task: {mtask.task}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>{}</p>
          )}
        </div>
      </div>

      <div className={styles.completed_tasks}>
        {completedTasks.length > 0 && (
          <div>
            <h2 className={styles.h2_title2}>
              {completedTasks.length == 1
                ? "Completed Task"
                : "Completed Tasks"}
            </h2>
            <ul className={styles.task_list_completed}>
              {completedTasks.map((t) => (
                <li key={t.id} className={styles.task_list_item_completed}>
                  <Link href={`/users/${t.id}`}>
                    {(i = i + 1)}, Date: {t.date}, Time: {t.time}, Task:{" "}
                    {t.task}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
