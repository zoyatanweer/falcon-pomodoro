import { Routes, Route } from "react-router-dom";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Task } from "./Pages/Task/Task";
import { Clock } from "./Pages/Clock/Clock";
import { useTheme } from "./Context/ThemeContext";
import "./index.css";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/Signup/Signup";

function App() {
  const { theme } = useTheme();
  return (
    <div className="App">
      {/* <div className={theme === "dark" ? "dark-theme" : "light-theme"}> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/task/:taskID" element={<Clock />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    // </div>
  );
}

export default App;
