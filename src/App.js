import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Task } from "./Pages/Task/Task";
import { Clock } from "./Pages/Clock/Clock";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/task/:taskID" element={<Clock />} />
      </Routes>
    </div>
  );
}

export default App;
