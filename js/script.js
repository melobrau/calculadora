document.addEventListener('DOMContentLoaded', function() {
    const outputPrevious = document.querySelector('[data-previous-operand]');
    const outputCurrent = document.querySelector('[data-current-operand]');

    let currentOperand = '';
    let previousOperand = '';
    let operator = '';

    const numberButtons = document.querySelectorAll('[data-number]');
    const operatorButtons = document.querySelectorAll('[data-operator]');
    const equalsButton = document.querySelector('[data-equals]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const deleteButton = document.querySelector('[data-delete]');

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.innerText);
            updateDisplay();
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperator(button.innerText);
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        calculate();
        updateDisplay();
    });

    allClearButton.addEventListener('click', () => {
        clear();
        updateDisplay();
    });

    deleteButton.addEventListener('click', () => {
        deleteLast();
        updateDisplay();
    });

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }

    function chooseOperator(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculate();
        }
        operator = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation.toString();
        operator = '';
        previousOperand = '';
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operator = '';
    }

    function deleteLast() {
        currentOperand = currentOperand.slice(0, -1);
    }

    function updateDisplay() {
        outputCurrent.innerText = currentOperand;
        outputPrevious.innerText = previousOperand + operator;
    }
});
