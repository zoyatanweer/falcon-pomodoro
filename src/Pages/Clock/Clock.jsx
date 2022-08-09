import React, { useEffect, useState, useRef } from "react";
import { Header } from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTask } from "../../Context/TaskContext";
import { PlayIcon, PauseIcon, ResetIcon } from "../../Assets/Svg/allsvg";
import "./Clock.css";

const Clock = () => {
  const { tasks } = useTask();
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [clockType, setClockType] = useState("work");
  const [isPaused, setIsPaused] = useState(true);
  const { taskID } = useParams();

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const clockTypeRef = useRef(clockType);

  const currentTask = tasks.find((task) => taskID === task.id);

  //functions
  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const initialTimer = () => {
    secondsLeftRef.current =
      clockType === "work" ? currentTask.time * 60 : currentTask.break * 60;
    setSecondsLeft(secondsLeftRef.current);
  };

  const nextTimer = () => {
    const nextClockType = clockTypeRef.current === "work" ? "break" : "work";
    const currentSeconds =
      nextClockType === "work" ? currentTask.time * 60 : currentTask.break * 60;
    setClockType(nextClockType);
    clockTypeRef.current = nextClockType;
    setSecondsLeft(currentSeconds);
    secondsLeftRef.current = currentSeconds;
  };

  useEffect(() => {
    initialTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return nextTimer();
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTask, clockType]);

  const totalSeconds =
    clockType === "work" ? currentTask.time * 60 : currentTask.break * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <>
      <Header />
      <div className="clock-page">
        <div className="clock-section">
          <div className="pomodoro-timer">
            <div style={{ width: 300, height: 300 }}>
              <CircularProgressbar
                className="clock"
                value={percentage}
                text={minutes + ":" + seconds}
                styles={buildStyles({
                  pathColor: "#f9c543",
                  textColor: "#000000",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
            <div className="clock-buttons-container">
              <button
                className="btn-clocks"
                onClick={() => (
                  setIsPaused(false), (isPausedRef.current = false)
                )}
              >
                <PlayIcon />
                Start
              </button>
              <button
                className="btn-clocks"
                onClick={() => (
                  setIsPaused(true), (isPausedRef.current = true)
                )}
              >
                <PauseIcon />
                Pause
              </button>
              <button className="btn-clocks" onClick={() => initialTimer()}>
                <ResetIcon />
                Reset
              </button>
            </div>
          </div>
          <div className="task-section">
            <h1> {currentTask.title} </h1>
            <p>{currentTask.description} </p>
            <h3>Current Clock type: {clockType}</h3>

            <button
              onClick={() => setClockType("work")}
              className="btn-clocktype"
            >
              Work
            </button>
            <button
              onClick={() => setClockType("break")}
              className="btn-clocktype"
            >
              Break
            </button>
            <div className="task-timer">
              <p>Work: {currentTask.time} minutes</p>
              <p>Break: {currentTask.break} minutes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Clock };
