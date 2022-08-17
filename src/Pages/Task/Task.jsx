import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AddTaskIcon,
  DeleteIcon,
  EditIcon,
  WatchIcon,
} from "../../Assets/Svg/allsvg";
import { Header } from "../../Components/Header/Header";
import { Modal } from "../../Components/Modal/Modal";
import { useTask } from "../../Context/TaskContext";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

import "./Task.css";
import { useTheme } from "../../Context/ThemeContext";

const Task = () => {
  const {
    tasks,
    setTasks,
    newTask,
    setNewTask,
    edit,
    setEdit,
    createTask,
    editTask,
    deleteTask,
  } = useTask();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const { theme } = useTheme();

  const editTaskHandler = (task) => {
    setEdit(true);
    setModalOpen(true);
    setNewTask({
      ...newTask,
      title: task.name,
      description: task.description,
      time: task.time,
      break: task.break,
    });
    setCurrentTask(task);
  };

  const tasksCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);

  return (
    <>
      <Header />

      <div
        className="tasks-section"
        // className={`tasks-section  ${
        //   theme === "light" ? "tasks-section" : "dark-theme"
        // } `}
        style={{
          background: modalOpen ? "#be8800cc" : "var(--yellow-color)",
        }}
      >
        <div className="task-section-heading">
          <h2>Welcome back, User!</h2>
          <h3>You have {newTask.length} tasks left!</h3>
        </div>

        <div
          className="tasks-container"
          // className={`tasks-container  ${
          //   theme === "light" ? "tasks-container" : "dark-theme"
          // } `}
          style={{
            background: modalOpen ? "#ddd9d9" : "white",
          }}
        >
          <div
            className="add-task flex-prop"
            // className={`add-task flex-prop  ${
            //   theme === "light" ? "dark-theme" : "light-theme"
            // } `}
            style={{
              background: modalOpen ? "#ddd9d9" : "white",
            }}
          >
            <h3 className="add-task-heading">Add Task</h3>
            <button
              onClick={() => setModalOpen(true)}
              className="task-button"
              style={{
                background: modalOpen ? "#ddd9d9" : "white",
              }}
            >
              <AddTaskIcon className="add-task-icon" />
            </button>
          </div>
          <Modal show={modalOpen} onClose={() => setModalOpen(false)} />

          {tasks.map((task) => {
            return (
              <div className="task" key={task.id}>
                <h3>{task.title}</h3>
                <div className="task-action-btn">
                  <Link to={`/task/${task.id}`}>
                    <WatchIcon className="task-icon" />
                  </Link>

                  <EditIcon
                    className="task-icon"
                    onClick={() => editTaskHandler(task)}
                  />
                  <DeleteIcon
                    className="task-icon"
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Task };
