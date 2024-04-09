import { createEffect, createRef } from "solid-js";
import { render } from "solid-js/web";
import { createStore, produce } from "solid-js/store";
import "./catchTheDot.css";

const CatchTheDot = () => {
  const [store, setStore] = createStore({
    dotSize: "30px",
    score: 0,
    counter: 5,
    dotStyle: "",
    dotBackground: "lightgray",
    gameOver: false,
    intervalDuration: 1000,
  });
  let timerRef;

  const handleMouseEnter = () => {
    if (store.gameOver) return;
    handleDotSize(5);
    handleScore();
    handleMoveDot();
    handleChangeBackgroundColor();
    handleTimerChanges();
  };

  createEffect(() => {
    if (store.counter === 0) {
      setStore("gameOver", true);
      clearInterval(timerRef);
    }
  });

  createEffect(() => {
    setStore(
      "intervalDuration",
      (intervalDuration) => intervalDuration - store.score * 2
    );
  });

  const handleChangeBackgroundColor = () => {
    setStore(
      "dotBackground",
      () => "#" + ((Math.random() * 0xffffff) << 0).toString(16)
    );
  };

  const handleMoveDot = () => {
    const randomWidth = () => Math.random() * window.innerWidth;
    const randomeHeight = () => Math.random() * window.innerHeight;
    setStore(
      "dotStyle",
      () => `translate(${randomWidth()}px, ${randomeHeight()}px)`
    );
  };

  const handleScore = () => {
    setStore("score", (oldScore) => oldScore + 1);
  };

  const handleTimerChanges = () => {
    if (timerRef) {
      clearInterval(timerRef);
      setStore("counter", 5);
    }

    timerRef = setInterval(() => {
      setStore("counter", (oldCounter) => oldCounter - 1);
    }, store.intervalDuration);

    setTimeout(() => {
      setStore("dotSize", "30px");
    }, 500);
  };

  const handleDotSize = (value) => {
    setStore("dotSize", `${value}px`);
  };

  return (
    <div class="catchTheDot">
      <div class="timer">{store.gameOver ? "Game over!" : store.counter}</div>
      <div
        onMouseEnter={handleMouseEnter}
        style={{
          "background-color": store.dotBackground,
          transform: store.dotStyle,
          height: store.dotSize,
          width: store.dotSize,
        }}
        class="dot"
      >
        {store.score}
      </div>
    </div>
  );
};

render(CatchTheDot, document.getElementById("app"));
