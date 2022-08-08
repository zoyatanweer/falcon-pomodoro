import React, { useEffect, useState, useRef } from "react";
import { Header } from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTask } from "../../Context/TaskContext";
import { PlayIcon, PauseIcon, ResetIcon } from "../../Assets/Svg/allsvg";
import "./Clock.css";

const Clock = ({ tasks }) => {
  const state = useTask();
  console.log("state", state);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [clockType, setClockType] = useState("work");
  const [isPaused, setIsPaused] = useState(false);
  const { taskID } = useParams();

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const clockTypeRef = useRef(clockType);

  console.log("tasks from clock", tasks);
  const currentTask = {};
  // console.log("current task", currentTask);
  // console.log("current task time", currentTask.time);

  //functions
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchClockType() {
      const nextClockType = clockTypeRef.current === "work" ? "break" : "work";
      // console.log("yaha", clockTypeRef.current);
      const nextSeconds =
        (nextClockType === "work" ? currentTask.time : currentTask.break) * 60;
      // console.log("next", nextSeconds);
      setClockType(nextClockType);
      clockTypeRef.current = nextClockType;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = currentTask.time * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchClockType();
      }

      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // console.log("yaha", clockTypeRef.current);
  // console.log("next", secondsLeftRef.current);

  const totalSeconds =
    clockType === "work" ? currentTask.time * 60 : currentTask.break * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  // console.log("perce", percentage);

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
                // value={60}
                value={percentage}
                text={minutes + ":" + seconds}
                // text={currentTask.time + ":" + seconds}
                // text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: "#f9c543",
                  textColor: "#000000",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
            <div className="clock-buttons-container">
              <button className="clock-buttons">
                <PlayIcon
                // onClick={() => (
                //   setIsPaused(false), (isPausedRef.current = false)
                // )}
                />
                Start
              </button>
              <button className="clock-buttons">
                <PauseIcon
                // onClick={() => (
                //   setIsPaused(true), (isPausedRef.current = true)
                // )}
                />
                Pause
              </button>
              <button className="clock-buttons">
                <ResetIcon />
                Reset
              </button>
            </div>
          </div>
          <div className="task-section">
            <h1>task title: </h1>
            <p>description: </p>
            <div className="task-timer">
              <p>Work: work minutes</p>
              <p>Break: break minutes </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Clock };
