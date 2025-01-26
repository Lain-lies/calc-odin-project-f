const getDigitButtons = document.querySelectorAll(".left-buttons-container button");
const digitButtons = Array.from(getDigitButtons);

let inputValue = "";

digitButtons.map(button => {
    
    button.addEventListener("click", () => {

        alert(button.textContent);        
        inputValue += button.textContent;
        
        console.log(inputValue);
    });
});



