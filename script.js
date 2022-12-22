const digits = 12;
let currentValue = "";
let previousValue = "";
let currentOperator = "";
let displayContent = "0";

const display = document.querySelector("#display");
const numbButts = document.querySelectorAll(".number");
const operatorButts = document.querySelectorAll(".operator");
const equalButt = document.querySelector("#equal");
const wipeButt = document.querySelector("#clear");

//EventHandlers for buttons
numbButts.forEach((num) =>
  num.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  })
);

operatorButts.forEach((operator) =>
  operator.addEventListener("click", (e) => {
    handleOperator(e.target);
  })
);

equalButt.addEventListener("click", handleEqual);
wipeButt.addEventListener("click", clear);

//helper
function handleNumber(num) {
  //TODO move check to updateDisplay
  if (currentValue.length > digits) {
    return;
  }

  currentValue = currentValue.concat("", num);
  updateDisplay(currentValue);
}

function handleOperator(operator) {
  //user chains operators together without pressing equal
  if (currentOperator) {
    handleEqual();
  }
  currentOperator = operator.value;
  previousValue = currentValue;
  currentValue = "";
  updateDisplay(previousValue);
}
function handleEqual() {
  if (currentValue && previousValue && currentOperator) {
    currentValue = operate(currentOperator, previousValue, currentValue);
    previousValue = "";
    currentOperator = "";

    updateDisplay(currentValue);
  }
}
function clear(){
 currentValue = "";
 previousValue = "";
 currentOperator = "";
 displayContent = "0";
 updateDisplay(displayContent)
}
function updateDisplay(str) {
  
  let roundDigits = digits - 2;
  let tempDisplay = Math.round(str * roundDigits ** 10) / roundDigits ** 10;
  tempDisplay = tempDisplay.toString();

  if (tempDisplay.length > digits) {
    tempDisplay =tempDisplay.slice(0,digits)
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
