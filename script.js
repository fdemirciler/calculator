const screenPreviousCalculation = document.getElementById("previous-calculation");
const screenCurrentCalculation = document.getElementById("current-calculation");
const buttonOperands = document.querySelectorAll(".operand");
const buttonOperator = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalButton = document.getElementById("equal");

let previousNumber = "";
let currentNumber = "";
let selectedOperator = undefined;

const operate = () => {
    let calculations;
    if (!previousNumber || !currentNumber) {
        return;
    }

    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(curr)) {
        return;
    }

    switch (selectedOperator) {
        case "+":
            calculations = prev + curr;
            break;
        case "-":
            calculations = prev - curr;
            break;
        case "×":
            calculations = prev * curr;
            break;
        case "÷":
            if (curr === 0) {
                alert("You can't divide by 0!");
                clearAll();
                return;
            }
            calculations = prev / curr;
            break;
        default:
            return;
    }

    currentNumber = calculations.toString();
    selectedOperator = undefined;
    previousNumber = "";
}

const updateScreen = () => {
    screenCurrentCalculation.innerText = currentNumber;
    if (selectedOperator != null) {
        screenPreviousCalculation.innerText = previousNumber + selectedOperator;
    } else {
        screenPreviousCalculation.innerText = "";
    }
}

const addNumber = (number) => {
    if (number === "•" || number === ".") {
        if (currentNumber.length === 0 || currentNumber.includes(".")) {
            return;
        }
        number = "."
    }
    if (currentNumber === "0") {
        currentNumber = "";
    }
    currentNumber = currentNumber.toString() + number.toString();
}

const selectOperation = (operator) => {
    if (currentNumber === "") {
        return
    }
    if (previousNumber !== "") {
        const prev = screenPreviousCalculation.innerText;
        if (currentNumber.toString() === "0" && prev[prev.length - 1] === "÷") {
            alert("You can't divide by 0!")
            clearAll();
            return;
        }
        operate();
    }
    selectedOperator = operator;
    previousNumber = currentNumber;
    currentNumber = "";
}

const clearAll = () => {
    currentNumber = "";
    previousNumber = "";
    selectedOperator = undefined;
}


const deleteOne = () => {
    currentNumber = currentNumber.toString().slice(0, -1);
}

const takeFromKeyboard = (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key === ".") {
        addNumber(e.key);
        updateScreen();
    }
    if (e.key === "Backspace") {
        deleteOne();
        updateScreen();
    }
    if (e.key === "Escape") {
        clearAll();
        updateScreen();
    }
    if (e.key === "=") {
        operate();
        updateScreen();
    }
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        selectOperation(convertOperator(e.key))
        updateScreen();
    }
}

const convertOperator = (keyboardOperator) => {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "×";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "+") return "+";
}

document.addEventListener("keydown", takeFromKeyboard)

buttonOperands.forEach((button) => {
    button.addEventListener("click", () => {
        addNumber(button.innerText);
        updateScreen();
    })
})

buttonOperator.forEach((operator) => {
    operator.addEventListener("click", () => {
        selectOperation(operator.innerText);
        updateScreen();
    })
})

clearButton.addEventListener("click", () => {
    clearAll();
    updateScreen();
})

deleteButton.addEventListener("click", () => {
    deleteOne();
    updateScreen();
});

equalButton.addEventListener("click", () => {
    operate();
    updateScreen();
})