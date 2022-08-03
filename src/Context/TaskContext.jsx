import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    time: 0,
    break: 0,
  });

  //firebase operations
  const tasksCollectionRef = collection(db, "tasks");

  //for getting data
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      console.log("data aaya", data);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);

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

  const editTask = async () => {};

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, newTask, setNewTask, createTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { useTask, TaskProvider };
