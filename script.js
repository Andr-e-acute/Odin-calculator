const digits=12;
let currentValue='';
let previousValue='';
let currentOperator="";
let displayContent="";

const display = document.querySelector("#display");
const numbButts = document.querySelectorAll(".number");
const operatorButts = document.querySelectorAll(".operator")
const equalButt =document.querySelector("#equal");
//EventHandlers for buttons
numbButts.forEach((num)=>num.addEventListener("click",(e)=>{
  handleNumber(e.target.textContent)
}))

operatorButts.forEach((operator)=>operator.addEventListener("click",(e)=>{
 handleOperator(e.target)
}))

equalButt.addEventListener("click",handleEqual);


//helper
function handleNumber(num){
if(currentValue.length>digits){
  return
}
currentValue =currentValue.concat("",num)
updateDisplay(currentValue)
}

function handleOperator(operator){
  currentOperator=operator.value;
  previousValue=currentValue;
  currentValue="";
  updateDisplay(operator.textContent);
}
function handleEqual(){
  if(currentValue&&previousValue&&currentOperator){
    let result=operate(currentOperator,previousValue,currentValue)
    previousValue="";
    currentOperator="";

    // TODO function for rounding decimalPlace to the length of digits
    currentValue=result;
    updateDisplay(currentValue)
  }
  
}
function updateDisplay(str){
  console.log(str.length)
  display.textContent = str ;
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
    console.log(`operate don't has the case: "${operator}"`)
      break;
  }
  
}
