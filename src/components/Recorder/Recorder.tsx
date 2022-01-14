import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDateStart, start, stop } from "../../redux/recorder";
import cx from "classnames";
import "./Recorder.css";
import { createUserEvent } from "../../redux/user-events";
export const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);
const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== "";
  let interval = useRef<number>(0);
  const [count, setCount] = useState<number>(0);
  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);
      dispatch(createUserEvent());
      dispatch(stop());
    } else {
      dispatch(start());
      interval.current = window.setInterval(
        () => setCount((prev) => prev + 1),
        1000
      );
    }
  };
  useEffect(() => {
    return () => window.clearInterval(interval.current);
  }, []);
  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;
  const hours = seconds ? Math.floor(seconds / 3600) : 0;
  seconds = seconds - hours * 60 * 60;
  let minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds = seconds - minutes * 60;
  return (
    <div className={cx("recorder", { "recorder-started": started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
