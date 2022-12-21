let currentValue='';
let previousValue='';

const display = document.querySelector("#display");
const numbButts = document.querySelectorAll(".number");
const operatorButts = document.querySelectorAll(".operator")

//EventHandlers for buttons
numbButts.forEach((num)=>num.addEventListener("click",(e)=>{
  handleNumber(e.target.textContent)
}))

operatorButts.forEach((operator)=>operator.addEventListener("click",(e)=>{
  console.log(e)
}))


//helper
function handleNumber(num){
if(currentValue.length<10){
  currentValue =currentValue.concat("",num)
  updateDisplay()
}

}
function updateDisplay(){
  display.textContent = currentValue ;
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
