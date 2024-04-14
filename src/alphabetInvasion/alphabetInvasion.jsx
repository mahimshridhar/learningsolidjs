import { Show, createEffect, createRef, onCleanup, onMount } from "solid-js";
import { render } from "solid-js/web";
import { createStore, produce } from "solid-js/store";
import { getRandomAlphabet, getRandomIndex } from "./utilities";
import "./alphabetInvasion.css";

const AlphabetInvasion = () => {
  const outerLength = 30;
  const innerLength = 40;
  let timer;

  const [store, setStore] = createStore({
    score: 0,
    gameOver: false,
    battleField: Array.from({ length: outerLength }, () =>
      Array.from({ length: innerLength }, () => " ")
    ),
    letters: [
      {
        letter: getRandomAlphabet(),
        pos: getRandomIndex(),
      },
    ],
  });

  onMount(() => {
    window.addEventListener("keydown", handleKeyPress);
    handleGenerateInvaders();
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyPress);
    clearInterval(timer);
  });

  createEffect(() => {
    handleDetectCollision();

    //find a better solution for this
    handleClearBattleFeild();

    handlePopulateBattleFeild();
  });

  const handleClearBattleFeild = () => {
    setStore(
      produce((store) => {
        store.battleField = Array.from({ length: outerLength }, () =>
          Array.from({ length: innerLength }, () => " ")
        );
      })
    );
  };

  const handlePopulateBattleFeild = () => {
    store.letters.forEach((l, i) => {
      setStore(
        produce((store) => {
          store.battleField[i][l.pos] = l.letter;
        })
      );
    });
  };

  const handleGenerateInvaders = () => {
    timer = setInterval(() => {
      setStore(
        produce((store) => {
          store.letters = [
            {
              pos: getRandomIndex(),
              letter: getRandomAlphabet(),
            },
            ...store.letters,
          ];
        })
      );
    }, 500);
  };

  const handleDetectCollision = () => {
    if (store.letters.length >= outerLength) {
      clearInterval(timer);
      setStore(
        produce((store) => {
          store.gameOver = true;
        })
      );
    }
  };

  const handleRenderBattleFeild = () => {
    return (
      <>
        <For each={store.battleField}>
          {(item) => {
            return (
              <>
                |{handleRenderRow(item)}|{"\n"}
              </>
            );
          }}
        </For>
        {"=".repeat(innerLength + 2)}
      </>
    );
  };

  const handleKeyPress = (e) => {
    if (store.letters[store.letters.length - 1].letter === e.key) {
      setStore(
        produce((store) => {
          store.letters.pop();
          store.score++;
        })
      );
    }
  };

  const handleRenderRow = (row) => {
    return row.map((letter) => letter);
  };
  return (
    <div class="alphabetInvasion">
      <span>score: {store.score}</span>
      <pre>{handleRenderBattleFeild()}</pre>
      <Show when={store.gameOver}>
        <div>GAME OVER!!</div>
      </Show>
    </div>
  );
};

render(AlphabetInvasion, document.getElementById("app"));
