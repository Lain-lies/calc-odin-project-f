function reset(){
    
    screen.textContent = "0";
    buttonClickedOnce = false;
    inputValue = "";

}
function evaluate(){
    
    let result = calculationStack[1](+calculationStack[0], +calculationStack[2]);
    calculationStack = [];
    return result;
}
function add(a, b) {return a + b};
function subtract(a, b){return a - b;}
function multiply(a, b){return a * b;}
function divide(a, b){return a / b;}

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

        const operation = operationFunctionArray[i];

        if(calculationStack.length === 0){ // Start state
            
            calculationStack.push(inputValue);
            calculationStack.push(operation);
            
        }else if(calculationStack.length === 2){
            
            calculationStack.push(inputValue);

        }
        
        if(calculationStack.length === 3){

            let result = evaluate();
            calculationStack.push(result)
            calculationStack.push(operation);

        }

        console.log(calculationStack);
        let operationSymbol = operationFunctionSymbol[i];
        screen.textContent += operationSymbol;
        inputValue = "";

    });
}

equalButton.addEventListener("click", () => {

    if(calculationStack.length === 0){return;}
    if(inputValue === "") {return;}

    if(calculationStack.length === 2){

        calculationStack.push(inputValue);
        let result = evaluate();
        inputValue = `${result}`;
        console.log(calculationStack);
    }
    
});