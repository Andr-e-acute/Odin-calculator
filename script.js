const digits = 22;
let currentValue = "";
let previousValue = "";
let currentOperator = "";

const display = document.querySelector("#display");
const numbButts = document.querySelectorAll(".number");
const operatorButts = document.querySelectorAll(".operator");
const equalButt = document.querySelector("#equal");
const wipeButt = document.querySelector("#clear");
const backspaceButt = document.querySelector("#backspace");
const decimalButt = document.querySelector("#decimal");

//EventHandlers for buttons
numbButts.forEach((num) =>
  num.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  })
);

operatorButts.forEach((operator) =>
  operator.addEventListener("click", (e) => {
    handleOperator(e.target.value);
  })
);

equalButt.addEventListener("click", handleEqual);
wipeButt.addEventListener("click", clear);
backspaceButt.addEventListener("click", deleteLast);
decimalButt.addEventListener("click", addDecimal);

window.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  console.log(e.key);
  if (!isNaN(e.key)) {
    handleNumber(e.key);
  }
  switch (e.key) {
    case ".":
      addDecimal();
      break;
    case "+":
      handleOperator("add");
      break;
    case "-":
      handleOperator("subtract");
      break;
    case "*":
      handleOperator("multiply");
      break;
    case "/":
      handleOperator("divide");
      break;
    case "=":
      handleEqual();
      break;
    case "Enter":
      handleEqual();
      e.preventDefault();
      break;
    case "Backspace":
      deleteLast();
      break;
    case "Escape":
      clear();
      break;
    default:
      break;
  }
}

function handleNumber(num) {
  if (currentValue === "0") {
    currentValue = num;
  } else {
    currentValue = currentValue.concat("", num);
  }
  updateDisplay(currentValue);
}
function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue = currentValue.concat("", ".");

    display.textContent = currentValue;
  }
}

function handleOperator(operator) {
  //user chains operators together without pressing equal
  if (currentOperator) {
    handleEqual();
  }
  currentOperator = operator;
  previousValue = currentValue;
  currentValue = "0";
  updateDisplay(previousValue);
}
function handleEqual() {
  if (currentValue && previousValue && currentOperator) {
    currentValue = operate(
      currentOperator,
      previousValue,
      currentValue
    ).toString();
    previousValue = "";
    currentOperator = "";

    updateDisplay(currentValue);
  }
}
function deleteLast() {
  console.log(typeof currentValue);
  if (currentValue.length == 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, currentValue.length - 1);
  }
  updateDisplay(currentValue);
}
function clear() {
  currentValue = "0";
  previousValue = "";
  currentOperator = "";

  updateDisplay(currentValue);
}
function updateDisplay(str) {
  //when it can't convert do a number display the content should only be the
  //case for division by null

  if (isNaN(str)) {
    currentValue = "0";
    previousValue = "0";
    display.textContent = str;
    return;
  }

  let roundDigits = digits - 2;
  let tempDisplay = Math.round(str * roundDigits ** 10) / roundDigits ** 10;
  tempDisplay = tempDisplay.toString();

  if (tempDisplay.length > digits) {
    tempDisplay = tempDisplay.slice(0, digits);
  }

  display.textContent = tempDisplay;
}

//Math functions
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num1 == 0) {
    return "don't do this";
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "add":
      return add(num1, num2);

    case "subtract":
      return subtract(num1, num2);

    case "multiply":
      return multiply(num1, num2);

    case "divide":
      return divide(num1, num2);

    default:
      console.log(`operate don't has the case: "${operator}"`);
      break;
  }
}
