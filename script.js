function add(a, b){
    
    return a + b;

}

function subtract(a, b){
    
    return a - b;

}

function multiply(a, b){
    
    return a * b;
}

function divide(a, b){
    
    return a / b;
}

const fetchDigitButtons = document.querySelectorAll(".left-buttons-container button");
const digitButtons = Array.from(fetchDigitButtons);

let inputStack = [];
let operationStack = [];

let inputValue = "";

digitButtons.map(button => {
    
    button.addEventListener("click", () => {

        alert(button.textContent);        
        inputValue += button.textContent;
        
        console.log(inputValue);
    });
});

const operationFunctionArray = [add, subtract, multiply, divide];
const fetchOperationButtons = document.querySelectorAll(".right-buttons-container button");

const operationButtons = Array.from(fetchOperationButtons);
const equalButton = operationButtons.pop();

for(let i = 0; i < operationFunctionArray.length; i++){
    
    operationButtons[i].addEventListener("click", () => {
        
        if(inputValue === "") return;

        let operation = operationFunctionArray[i];
        operationStack.push(operation);
        inputStack.push(inputValue);

        inputValue = "";
        console.log(`input stack : ${inputStack}`);
        console.log(`operation stack : ${operationStack}`);
        
    });
}

console.log(operationButtons);
console.log(equalButton);



