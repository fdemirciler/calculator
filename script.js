// Get elements

const preState = document.getElementById("preState");
const currState = document.getElementById("currState");
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalBtn = document.getElementById("equal");

// Define parameters

let preNumber = "";
let currNumber = "";
let activeOperation = undefined;

// Define math operations

function add(a, b) {
    return a + b
};

function subtract(a, b) {
    return a - b
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {

    if (b === 0) {

        alert('Denominator must be other than zero!');
        clearAll();

    } else {

        return a / b

    }
}

// Define main calc operation

const operate = () => {
    let calculations;
    if (!preNumber || !currNumber) {
        return 0;
    }

    const prev = parseFloat(preNumber);
    const curr = parseFloat(currNumber);

    if (isNaN(prev) || isNaN(curr)) {
        return;
    } else if (activeOperation === "+") {
        calculations = add(prev, curr);

    } else if (activeOperation === "-") {
        calculations = subtract(prev, curr);

    } else if (activeOperation === "×") {
        calculations = multiply(prev, curr);

    } else {
        
        calculations = divide(prev, curr)

    }

    currNumber = calculations.toString();
    activeOperation = undefined;
    preNumber = "";
}

// Update screen between calculations

const updateStates = () => {
    currState.innerText = currNumber;
    if (activeOperation != null) {
        preState.innerText = preNumber + activeOperation;
    } else {
        preState.innerText = "";
    }
}

const addNumber = (number) => {
    if (number === "•" || number === ".") {
        if (currNumber.length === 0 || currNumber.includes(".")) {
            return;
        }
        number = "."
    }
    if (currNumber === "0") {
        currNumber = "";
    }
    currNumber = currNumber.toString() + number.toString();
}

const selectOperation = (operator) => {
    if (currNumber === "") {
        return
    }
    if (preNumber !== "") {
        const prev = preState.innerText;
        if (currNumber.toString() === "0" && prev[prev.length - 1] === "÷") {
            alert('Denominator must be other than zero!')
            clearAll();
            return;
        }
        operate();
    }
    activeOperation = operator;
    preNumber = currNumber;
    currNumber = "";
}

const clearAll = () => {
    currNumber = "";
    preNumber = "";
    activeOperation = undefined;
}


const deleteOne = () => {
    currNumber = currNumber.toString().slice(0, -1);
}

// Keyboard inputs 

const keyboardEntry = (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key === ".") {
        addNumber(e.key);
        updateStates();
    }
    if (e.key === "Backspace") {
        deleteOne();
        updateStates();
    }
    if (e.key === "Escape") {
        clearAll();
        updateStates();
    }
    if (e.key === "=") {
        operate();
        updateStates();
    }
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        selectOperation(convertOpr(e.key))
        updateStates();
    }
}

const convertOpr = (keyboardOpr) => {
    if (keyboardOpr === "/") return "÷";
    if (keyboardOpr === "*") return "×";
    if (keyboardOpr === "-") return "-";
    if (keyboardOpr === "+") return "+";
}

document.addEventListener("keydown", keyboardEntry)

// Event listeners

numberBtn.forEach((button) => {
    button.addEventListener("click", () => {
        addNumber(button.innerText);
        updateStates();
    })
})

operatorBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
        selectOperation(operator.innerText);
        updateStates();
    })
})

clearBtn.addEventListener("click", () => {
    clearAll();
    updateStates();
})

deleteBtn.addEventListener("click", () => {
    deleteOne();
    updateStates();
});

equalBtn.addEventListener("click", () => {
    operate();
    updateStates();
})