const buttonArr = document.querySelectorAll('button');
const scriptEl = document.getElementById('script-area');
const inputEl = document.getElementById('script-input');
let lastPressed = null;
let currentDateTime = false;
let todaysMonth = false;
let returnStatement = false;
let fullDateVar;
let fullMonthVar;
let currentTimeVar;
buttonArr.forEach((button) => {});
buttonArr.forEach((button, idx) => {
	button.classList.add('button');
	button.addEventListener('click', (e) => {
		e.preventDefault();

		const expr = e.target.getAttribute('id');
		const keyType = e.target;
		switch (expr) {
			case 'start-input-script':
				appendKeys(expr, keyType);
				break;
			case 'send-input':
				sendInput(expr, keyType);
				break;
			case 'input-box':
				showInputBox(expr, keyType);
				break;
			case 'tab':
				send('Tab', keyType);
				break;
			case 'enter':
				send('Enter', keyType);
				break;
			case 'full-date':
				formatFullDate(keyType);
				break;
			case 'month-name':
				formatFullMonth(keyType);
				break;
			case 'current-time':
				formatCurrentTime(keyType);
				break;
			case 'arrow-up':
				send('Up', keyType);
				break;
			case 'arrow-left':
				send('Left', keyType);
				break;
			case 'arrow-right':
				send('Right', keyType);
				break;
			case 'arrow-down':
				send('Down', keyType);
				break;
			case 'exclamation':
				send('!', keyType);
				break;
			case 'send-full-date':
				sendTime(fullDateVar, keyType);
				break;
			case 'send-month':
				sendTime(fullMonthVar, keyType);
				break;
			case 'send-time':
				sendTime(currentDateTime, keyType);
				break;
			case 'sleep':
				sendString(`${startingLine(scriptEl.value)}Sleep, 300`, keyType);
				break;
			case 'return':
				sendString(`${startingLine(scriptEl.value)}return`, keyType);
				break;
			case 'new-line':
				sendString(`\n`, keyType);
				break;
			case 'clear':
				clearAll();
				break;
			case 'space':
				send('Space', keyType);
				break;
		}
	});
});
function sendTime(str, type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (!str || lastPressed != 'input') {
		return alert(
			'no date/time variables yet declared or you are putting this in the wrong place'
		);
	}

	let prefix = `${startingLine(scriptEl.value)}send, `;
	if (lastPressed === 'input') {
		console.log(type);
		scriptEl.value += `%${str}% `;
		inputEl.value = '';

		return;
	} else {
		console.log(type);
		scriptEl.value += prefix + '%' + str + '% ';
		inputEl.value = '';

		return;
	}
}
function sendString(str, type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (type.getAttribute('data-type') == 'return' && returnStatement == true) {
		return alert('only one return statement allowed');
	}
	returnStatement = type.getAttribute('data-type') === 'return' ? true : false;
	scriptEl.value += `${str}`;
	lastPressed = type.getAttribute('data-type');
}

function appendKeys(expr, type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (inputEl.value == '') {
		return alert('the input field is empty');
	}
	if (scriptEl.value != '') {
		return alert('do not put that there, it goes at the beginning, please');
	}
	scriptEl.value += `${startingLine(scriptEl.value)}:R*?:${inputEl.value}::`;
	inputEl.value = '';
	lastPressed = type.getAttribute('data-type');
	return;
}

function sendInput(expr, type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (inputEl.value == '') {
		return alert('the input field is empty');
	}

	scriptEl.value += `${startingLine(scriptEl.value)}SendInput, ${
		inputEl.value
	}`;
	inputEl.value = '';
	lastPressed = type.getAttribute('data-type');
	return;
}

function send(str, type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	let prefix = `${startingLine(scriptEl.value)}send, `;
	if (lastPressed === 'key') {
		console.log(type);
		scriptEl.value += `{${str}}`;
		inputEl.value = '';
		lastPressed = type.getAttribute('data-type');
		return;
	} else {
		console.log(type);
		scriptEl.value += prefix + '{' + str + '}';
		inputEl.value = '';
		lastPressed = type.getAttribute('data-type');
		return;
	}
}

function showInputBox(expr, type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	const [variable, prompt] = parseInput(inputEl.value);
	if (!variable || !prompt) {
		return alert(
			'the input is not formatted correctly.  you must specify the name of a variable followed by a comma and then the prompt you wish to display in the input box'
		);
	}

	scriptEl.value += `${startingLine(
		scriptEl.value
	)}InputBox, ${variable}, [${variable},${prompt}, , , , , , , , Type things here]`;
	lastPressed = type.getAttribute('data-type');
	return;
}

function parseInput(str) {
	const arr = str.split(',');
	return [arr[0], arr[1]];
}

function startingLine(input) {
	const startingLine = input === '' ? '' : `\n`;
	return startingLine;
}

function formatFullDate(type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (checkVarStatus(fullDateVar)) {
		return;
	}
	scriptEl.value += `${startingLine(
		scriptEl.value
	)}FormatTime, CurrentDateTime, , MM/dd/yyyy`;
	fullDateVar = 'CurrentDateTime';
	lastPressed = 'key';

	return;
}

function formatFullMonth(type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (checkVarStatus(fullMonthVar)) {
		return;
	}
	scriptEl.value += `${startingLine(
		scriptEl.value
	)}FormatTime, TodaysMonth, , MM`;
	fullMonthVar = 'TodaysMonth';
	lastPressed = 'key';
	return;
}

function formatCurrentTime(type) {
	if (returnStatement === true) {
		return alert('You have already returned, you cannot add any more stuff');
	}
	if (checkVarStatus(currentTimeVar)) {
		return;
	}
	scriptEl.value += `${startingLine(
		scriptEl.value
	)}FormatTime, CurrentTime, , hh:mm`;
	currentTimeVar = 'CurrentTime';
	lastPressed = 'key';

	return;
}

function checkVarStatus(variable) {
	if (variable) {
		alert('this variable has already been declared');
		return true;
	} else {
		return false;
	}
}

function clearAll() {
	if (confirm('Are you sure you want to clear everything?')) {
		scriptEl.value = '';
		lastPressed = null;
		currentDateTime = false;
		todaysMonth = false;
		returnStatement = false;
		fullDateVar;
		fullMonthVar;
		currentTimeVar;
		return;
	} else {
		return;
	}
}
