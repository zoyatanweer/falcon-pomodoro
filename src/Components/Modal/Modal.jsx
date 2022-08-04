import React, { useState } from "react";
import { CloseIcon } from "../../Assets/Svg/allsvg";
import { useTask } from "../../Context/TaskContext";

import "./Modal.css";

const Modal = ({ show, onClose }) => {
  const { newTask, setNewTask, createTask, editTask, edit, setEdit } =
    useTask();

  if (!show) {
    return null;
  }

  const addTaskHandler = (task) => {
    // createTask();
    if (edit === true) {
      editTask(task.id);
      setNewTask({
        title: "",
        description: "",
        time: 0,
        break: 0,
      });
      setEdit(false);
    } else {
      createTask();
    }
  };

  // const editTaskHandler = (task) => {
  //   setModalOpen(true);
  //   setNewTask({
  //     ...newTask,
  //     title: task.name,
  //     description: task.description,
  //     time: task.time,
  //     break: task.break,
  //   });
  //   console.log("naya aaya", task);
  // };

  return (
    <div className="modal-container">
      <CloseIcon className="modal-close-icon" onClick={onClose} />
      <label htmlFor="title" className="task-label">
        Title
      </label>
      <input
        type="text"
        className="task-input"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <label htmlFor="description"> Description </label>
      <input
        type="text"
        className="task-input desc"
        description={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <div className="task-time-section">
        <div className="task-time">
          <label htmlFor="time" className="task-label-time">
            Time:
          </label>
          <input
            type="number"
            className="task-input time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
          />
          <label htmlFor="break" className="task-label-break">
            Break:
          </label>
          <input
            type="number"
            className="task-input break"
            value={newTask.break}
            onChange={(e) => setNewTask({ ...newTask, break: e.target.value })}
          />
        </div>
      </div>

      <button
        className="add-task-btn"
        onClick={(task) => {
          addTaskHandler(task);
          onClose();
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export { Modal };
