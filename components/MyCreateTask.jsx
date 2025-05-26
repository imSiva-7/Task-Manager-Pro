"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import styles from "../css/createtask.module.css";
import Link from "next/link";

export default function taskManager() {
  const [Tasks, setTasks] = useState([]);
  const [EveryTask, setEveryTask] = useState([]);
  const [notCompleted, setNotCompleted] = useState([]);

  const [selectedTasks, setSeletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("storeTask")) || [];
    setTasks(savedTask);
    setEveryTask(savedTask);
  }, []);

  useEffect(() => {
    const completedTaskData = localStorage.getItem("completedTask");
    try {
      setCompletedTasks(JSON.parse(completedTaskData ?? "[]"));
    } catch (error) {
      console.error("Error parsing completed tasks:", error);
      setCompletedTasks([]);
    }
  }, []);

  useEffect(() => {
    const completedIds = completedTasks.map((task) => task.id);
    const incompleteTasks = Tasks.filter(
      (task) => !completedIds.includes(task.id)
    );
    setNotCompleted(incompleteTasks);
  }, [Tasks, completedTasks]);

  function createTask(e) {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    if (date && time && task) {
      const newTask = { id: uuidv4(), date, time, task };
      const everyTask = [...EveryTask, newTask];
      const updatedTask = [...Tasks, newTask];
      localStorage.setItem("storeTask", JSON.stringify(updatedTask));
      setTasks(updatedTask);
      setEveryTask(everyTask);
      // setTaskToBeCompleted(updatedTask);
      setDate("");
      setTime("");
      setTask("");
    }
  }

  function removeTask(e) {
    e.preventDefault();
    if (selectedTasks.length <= 0) {
      alert("No task Selected!");
      return;
    }
    const updatedTasks = Tasks.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    setTasks(updatedTasks);
    localStorage.setItem("storeTask", JSON.stringify(updatedTasks));
    setSeletedTasks([]);
  }

  function toggleSelectTask(index) {
    const updateselectedTasks = [...selectedTasks];
    if (updateselectedTasks.includes(index)) {
      const newSelection = updateselectedTasks.filter((i) => i !== index);
      setSeletedTasks(newSelection);
    } else {
      updateselectedTasks.push(index);
      setSeletedTasks(updateselectedTasks);
    }
  }

  function finishedTask(e) {
    e.preventDefault();

    if (selectedTasks.length <= 0) {
      alert("Select an task!");
      return;
    }

    // completedTasks.map((t) => {
    //   if (selectedTasks.includes(t.id)) {
    //     alert(`Task: ${t.task}, already marked completed`);
    //     return;
    //   }
    // });
    const prevCompletedTasks = JSON.parse(
      localStorage.getItem("completedTask") || "[]"
    );
    const markedCompleted = prevCompletedTasks.map((t) => t.id);
    const finishedTasksids = [...markedCompleted, ...selectedTasks];
    const finishedTasks = EveryTask.filter((t) =>
      finishedTasksids.includes(t.id)
    );

    localStorage.setItem("completedTask", JSON.stringify(finishedTasks));

    // const tobeCompleted = Tasks.filter((t) => !finishedTasksids.includes(t.id));
    // setTaskToBeCompleted(tobeCompleted);
    setCompletedTasks(finishedTasks);
  }

  return (
    <>
      <div className={styles.body}>
        <form className={styles.form_task} onSubmit={createTask}>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <label>Task: </label>
          <input
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            placeholder="Add Task..."
            required
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                document.querySelector("form").requestSubmit();
              }
            }}
          />
          <input type="submit" value="Create Task!" />
        </form>
      </div>

      <div>
        <button onClick={removeTask} className="remove_button">
          Remove
        </button>
        <button onClick={finishedTask} className="finish_button">
          Mark as Done
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {Tasks.length > 0 ? (
          <ul>
            <h2>Task to be completed: </h2>
            {notCompleted.map((mtask) => (
              <div key={mtask.id}>
                <li>
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(mtask.id)}
                    onChange={() => toggleSelectTask(mtask.id)}
                    aria-label={`Select task ${mtask.task}`}
                  />
                  <Link
                    href={`/users/${mtask.id}`}
                    style={{ textdecoration: "none" }}
                  >
                    Date: {mtask.date}, Time: {mtask.time}, Task: {mtask.task}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <p>No tasks yet</p>
        )}
      </div>

      <div>
        {completedTasks.length > 0 && (
          <div>
            <h2>Completed Tasks</h2>
            <ul>
              {" "}
              {completedTasks.map((t) => (
                <li key={t.id}>
                  <Link href={`/users/${t.id}`}>
                    Date: {t.date}, Time: {t.time}, Task: {t.task}
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
