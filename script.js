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



let buttonClickedOnce = false;
let calculationStack = [];
let inputValue = "";

const fetchDigitButtons = document.querySelectorAll(".left-buttons-container button");
const digitButtons = Array.from(fetchDigitButtons);

const fetchDigitLastTwoButtons = digitButtons.splice(-2, 2);

const pointButton = fetchDigitLastTwoButtons[0];
const clearButton = fetchDigitLastTwoButtons[1];

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


pointButton.addEventListener("click", () => {
    if(!buttonClickedOnce){
            
        screen.textContent = "";
        buttonClickedOnce = true;
    }

    if(inputValue.includes('.')){
        
        return;
    }
    
    inputValue += pointButton.textContent;
    screen.textContent += pointButton.textContent;
    console.log(inputValue);
});

clearButton.addEventListener("click", reset);

const operationFunctionArray = [add, subtract, multiply, divide];
const operationFunctionSymbol = [' + ', ' - ', ' x ', ' / '];
const fetchOperationButtons = document.querySelectorAll(".right-buttons-container button");
const operationButtons = Array.from(fetchOperationButtons);
const equalButton = operationButtons.pop();

for(let i = 0; i < operationFunctionArray.length; i++){
    
    operationButtons[i].addEventListener("click", () => {

        let operationSymbol = operationFunctionSymbol[i];

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
            screen.textContent = result;
            calculationStack.push(result)
            calculationStack.push(operation);

        }

        console.log(calculationStack);
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
        screen.textContent = result;
        inputValue = `${result}`;
        console.log(calculationStack);
    }
    
});