function reset(){
    
    inputStack = [];
    operationStack = [];
    screen.textContent = "0";
    inputValue = "";

}

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

let buttonClickedOnce= false;
let inputStack = [];
let operationStack = [];
let inputValue = "";

const fetchDigitButtons = document.querySelectorAll(".left-buttons-container button");
const digitButtons = Array.from(fetchDigitButtons);

const screen = document.querySelector(".screen");

digitButtons.map(button => {
    
    button.addEventListener("click", () => {
        
        if(!buttonClickedOnce){
            
            screen.textContent = "";
            buttonClickedOnce = true;
        }

        inputValue += button.textContent;
        screen.textContent += button.textContent;

        console.log(inputValue);
    });
});

const operationFunctionArray = [add, subtract, multiply, divide];
const operationFunctionSymbol = [' + ', ' - ', ' x ', ' / '];

const fetchOperationButtons = document.querySelectorAll(".right-buttons-container button");

const operationButtons = Array.from(fetchOperationButtons);
const equalButton = operationButtons.pop();


for(let i = 0; i < operationFunctionArray.length; i++){
    
    operationButtons[i].addEventListener("click", () => {
        
        if(inputValue === "") return;
        
        let operation = operationFunctionArray[i];
        operationStack.push(operation);
        inputStack.push(inputValue);

        let operationSymbol = operationFunctionSymbol[i];
        screen.textContent += operationSymbol;
        
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

    screen.textContent = "";
    
    let result = evaluate(inputStack, operationStack);
    
    if(result === Infinity){
        
        alert("Division Error");
        reset();
        return;
    }

    screen.textContent = `= ${result}`
    
});

