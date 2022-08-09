import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    time: 0,
    break: 0,
  });

  //firebase operations
  const tasksCollectionRef = collection(db, "tasks");

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const data = await getDocs(tasksCollectionRef);
  //     setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getTasks();
  // }, []);

  //functions
  const createTask = async () => {
    const docResponse = await addDoc(tasksCollectionRef, {
      title: newTask.title,
      description: newTask.description,
      time: newTask.time,
      break: newTask.break,
    });

    setTasks((value) => [
      ...value,
      {
        title: newTask.title,
        description: newTask.description,
        time: newTask.time,
        break: newTask.break,
        id: docResponse.id,
      },
    ]);

    setNewTask({
      title: "",
      description: "",
      time: 0,
      break: 0,
    });
  };

  // const editTask = async (id) => {
  //   console.log("aagaya");

  //   const selectedDocResponse = doc(db, "tasks", id);
  //   console.log("aagaya");

  //   const editedTask = {
  //     title: newTask.title,
  //     description: newTask.description,
  //     time: newTask.time,
  //     break: newTask.break,
  //   };

  //   await updateDoc(selectedDocResponse, editedTask);

  //   const tasksAfterUpdate = tasks.map((task) =>
  //     task.id === id
  //       ? {
  //           ...newTask,
  //           id: id,
  //           updatedOn: new Date(),
  //         }
  //       : task
  //   );

  //   setTasks(tasksAfterUpdate);
  //   setEdit(false);

  //   setNewTask({
  //     title: "",
  //     description: "",
  //     time: 0,
  //     break: 0,
  //   });
  //   navigate("/tasks");

  //   // await updateDoc(selectedDocResponse, editTask);
  // };

  const editTask = async (id) => {
    const selectedDocResponse = doc(db, "tasks", id);
    const editedTask = {
      title: newTask.title,
      description: newTask.description,
      time: newTask.time,
      break: newTask.break,
    };
    await updateDoc(selectedDocResponse, editedTask);

    const tasksAfterUpdate = tasks.map((task) =>
      task.id === id ? { ...newTask, id: id, updatedOn: new Date() } : task
    );
    setTasks(tasksAfterUpdate);
    setEdit(false);
    setNewTask({
      title: "",
      description: "",
      time: 0,
      break: 0,
    });
  };

  const deleteTask = async (id) => {
    const selectedDocResponse = doc(db, "tasks", id);
    await deleteDoc(selectedDocResponse);

    const tasksLeftAfterDelete = tasks.filter((task) => task.id !== id);
    setTasks(tasksLeftAfterDelete);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        newTask,
        setNewTask,
        edit,
        setEdit,
        createTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { useTask, TaskProvider };
