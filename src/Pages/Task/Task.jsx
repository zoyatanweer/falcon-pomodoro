import React, { useState } from "react";
import {
  AddTaskIcon,
  DeleteIcon,
  EditIcon,
  WatchIcon,
} from "../../Assets/Svg/allsvg";
import { Header } from "../../Components/Header/Header";
import { Modal } from "../../Components/Modal/Modal";
import { useTask } from "../../Context/TaskContext";
import "./Task.css";

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

  return (
    <>
      <Header />

      <div
        className="tasks-section"
        style={{
          background: modalOpen ? "#be8800cc" : "var(--yellow-color)",
          // opacity: modalOpen ? "0.7" : "1",
          // overflow: modalOpen ? "hidden" : "none",
        }}
      >
        <div className="task-section-heading">
          <h2>Welcome back, User!</h2>
          <h3>You have {tasks.length} tasks left!</h3>
        </div>

        <div
          className="tasks-container"
          style={{
            background: modalOpen ? "#ddd9d9" : "white",
          }}
        >
          <div
            className="add-task flex-prop"
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
              {/* <Modal show={modalOpen} /> */}
            </button>
          </div>
          <Modal show={modalOpen} onClose={() => setModalOpen(false)} />

          {tasks.map((task) => {
            return (
              <div
                className="task"
                key={task.id}
                // style={{
                //   background: modalOpen ? "#ddd9d9" : "white",
                // }}
              >
                <h3>{task.title}</h3>
                <div className="task-action-btn">
                  <WatchIcon className="task-icon" />
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
