function reset(){
    
    screen.textContent = "0";
    buttonClickedOnce = false;
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

function evaluate(){
    
    return calculationStack[1](+calculationStack[0], +calculationStack[2]);
}

let buttonClickedOnce= false;
let calculationStack = [];
let inputValue = "";

const fetchDigitButtons = document.querySelectorAll(".left-buttons-container button");
const digitButtons = Array.from(fetchDigitButtons);
const clearButton = digitButtons.pop();

const screen = document.querySelector(".screen");

digitButtons.map(button => {
    
    button.addEventListener("click", () => {
        
        if(!buttonClickedOnce){
            
            screen.textContent = "";
            buttonClickedOnce = true;
        }

        inputValue += button.textContent;
        screen.textContent += button.textContent;
    });
});

clearButton.addEventListener("click", reset);

const operationFunctionArray = [add, subtract, multiply, divide];
const operationFunctionSymbol = [' + ', ' - ', ' x ', ' / '];

const fetchOperationButtons = document.querySelectorAll(".right-buttons-container button");

const operationButtons = Array.from(fetchOperationButtons);
const equalButton = operationButtons.pop();


for(let i = 0; i < operationFunctionArray.length; i++){
    
    operationButtons[i].addEventListener("click", () => {
        
        if(inputValue === "") return;
        let operation = operationFunctionArray[i];

        // START
        if(calculationStack.length === 0){
            
            calculationStack.push(inputValue);
            calculationStack.push(operation);
            
        }else if(calculationStack.length === 2){
            
            calculationStack.push(inputValue);

        }
        
        if(calculationStack.length === 3){

            let result = evaluate();
            calculationStack = [];
            calculationStack.push(result)
            calculationStack.push(operation);
            
        }

        console.log(calculationStack);
        let operationSymbol = operationFunctionSymbol[i];
        screen.textContent += operationSymbol;
        
        inputValue = "";

    });
}

// equalButton.addEventListener("click", () => {

//     if(inputStack.length === 0){
        
//         console.log("Syntax Error: No Inputs")
//         return;
//     }

//     if(inputValue === "") {

//         console.log("Syntax Error: Last input is an operator, failed to evaluate");
//         return;

//     }

//     inputStack.push(inputValue);
//     inputValue = "";

//     inputStack = inputStack.map(input => {

//         return +input;

//     });

//     screen.textContent = "";
    
//     let result = evaluate(inputStack, operationStack);
    
//     if(result === Infinity){
        
//         alert("Division Error");
//         reset();
//         return;
//     }

//     screen.textContent = `= ${result}`
    
// });

