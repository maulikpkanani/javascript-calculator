const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null
};

function inputDigit(digit) {
	const { displayValue, waitingForSecondOperand } = calculator;

	if (waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue =
			displayValue === '0' ? digit : displayValue + digit;
	}
	console.log(calculator);
}

function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;
	if (!calculator.displayValue.includes(dot)) {
		calculator.displayValue += dot;
	}
}

function handleOperator(nextOperator) {
	const { firstOperand, displayValue, operator } = calculator;
	const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		console.log(calculator);
		return;
	}

	if (firstOperand == null) {
		calculator.firstOperand = inputValue;
		console.log(operator);
	} else if (operator) {
		const currentValue = firstOperand || '0';
		console.log(operator);
		const result = performCalculation[operator](currentValue, inputValue);
		console.log(result);
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
	console.log(calculator);
}

const performCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
	'%': (firstOperand, secondOperand) => firstOperand % secondOperand,

	'=': (firstOperand, secondOperand) => secondOperand
};

function clear(clear) {
	calculator.displayValue = clear.substring(0, clear.length - 1);
	return;
}

function resetCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.operator = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
	console.log(calculator);
}

function updateDisplay() {
	const display = document.querySelector('.calculator-screen');
	display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
// console.log(keys);

keys.addEventListener('click', event => {
	// console.log(event);
	const { target } = event;
	// console.log(target);
	// console.log(this);
	if (!target.matches('button')) {
		return;
	}

	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('decimal')) {
		inputDecimal(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('clear')) {
		clear(calculator.displayValue);
		updateDisplay();
		return;
	}

	if (target.classList.contains('all-clear')) {
		resetCalculator();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});

console.log(calculator);
