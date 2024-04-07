import { For, createSignal } from "solid-js";
import { render } from "solid-js/web";
import "./calculator.css";

const INVALID = "Invalid Expression";

const Calculator = () => {
  const [userInput, setUserInput] = createSignal("");

  const handleUserInput = (value) => {
    if (userInput().length === 0 && isNaN(value)) {
      return;
    }

    if (
      isNaN(userInput()[userInput().length - 1]) &&
      userInput().length > 0 &&
      isNaN(value)
    ) {
      return;
    }

    if (userInput() === INVALID) {
      setUserInput("");
    }
    setUserInput((old) => {
      return `${old}${value}`;
    });
  };

  const handleClear = () => {
    setUserInput("");
  };

  const handleDelete = () => {
    setUserInput((old) => old.slice(0, -1));
  };

  const handleCalculate = () => {

    const tokens = userInput().match(/[+\-*/×÷]|\d+(\.\d+)?/g);
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i = i + 2) {
      const operand = tokens[i + 1];
      const operator = tokens[i];

      if (operator === "+") {
        result = result + parseFloat(operand);
      } else if (operator === "-") {
        result = result - parseFloat(operand);
      } else if (operator === "×") {
        result = result * parseFloat(operand);
      } else if (operator === "÷") {
        if (operand === "0") {
          setUserInput(INVALID);
          return;
        }
        result = result / parseFloat(operand);
      }
    }
    setUserInput(String(result));
  };

  return (
    <div class="calculator">
      <div class="container">
        <div class="body">
          <div class="screen">{userInput()}</div>
          <div class="buttons">
            <button class="btn clear" onClick={handleClear}>
              CE
            </button>
            <button class="btn divide" onClick={() => handleUserInput("÷")}>
              &divide;
            </button>
            <button class="btn multiply" onClick={() => handleUserInput("×")}>
              &times;
            </button>
            <button class="btn minus" onClick={() => handleUserInput("-")}>
              -
            </button>
            <button class="btn seven" onClick={() => handleUserInput("7")}>
              7
            </button>
            <button class="btn eight" onClick={() => handleUserInput("8")}>
              8
            </button>
            <button class="btn nine" onClick={() => handleUserInput("9")}>
              9
            </button>
            <button class="btn add" onClick={() => handleUserInput("+")}>
              +
            </button>
            <button class="btn four" onClick={() => handleUserInput("4")}>
              4
            </button>
            <button class="btn five" onClick={() => handleUserInput("3")}>
              5
            </button>
            <button class="btn six" onClick={() => handleUserInput("6")}>
              6
            </button>
            <button class="btn enter" onClick={handleCalculate}>
              Enter
            </button>
            <button class="btn two" onClick={() => handleUserInput("2")}>
              2
            </button>
            <button class="btn three" onClick={() => handleUserInput("3")}>
              3
            </button>
            <button class="btn one" onClick={() => handleUserInput("1")}>
              1
            </button>
            <button class="btn del" onClick={handleDelete}>
              DEL
            </button>
            <button class="btn zero" onClick={() => handleUserInput("0")}>
              0
            </button>
            <button class="btn decimal" onClick={() => handleUserInput(".")}>
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

render(Calculator, document.getElementById("app"));
