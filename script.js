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

function evaluate(inputStack, operationStack){
    
    for(let i = 0; i < inputStack.length - 1; i++){
        
        inputStack[i + 1] = operationStack[i](inputStack[i], inputStack[i+1]);

    }

    return inputStack[inputStack.length - 1];

}

let inputStack = [];
let operationStack = [];
let inputValue = "";

const fetchDigitButtons = document.querySelectorAll(".left-buttons-container button");
const digitButtons = Array.from(fetchDigitButtons);

digitButtons.map(button => {
    
    button.addEventListener("click", () => {

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

equalButton.addEventListener("click", () => {

    if(inputStack.length === 0){
        
        console.log("Syntax Error: No Inputs")
        return;
    }

    if(inputValue === "") {

        console.log("Syntax Error: Last input is an operator, failed to evaluate");
        return;

    }

    inputStack.push(inputValue);
    inputValue = "";

    inputStack = inputStack.map(input => {

        return +input;

    });

    console.log(`Result : ${evaluate(inputStack, operationStack)}`);
    
});
