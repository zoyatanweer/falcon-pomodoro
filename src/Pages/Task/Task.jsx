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
  const { tasks, setTasks, createTask, editTask } = useTask();
  const [modalOpen, setModalOpen] = useState(false);

  const editTaskHandler = () => {};

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
                style={{
                  background: modalOpen ? "#ddd9d9" : "white",
                }}
              >
                <h3>{task.title}</h3>
                <div className="task-action-btn">
                  <WatchIcon className="task-icon" />
                  <EditIcon className="task-icon" onClick={editTaskHandler} />
                  <DeleteIcon className="task-icon" />
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
