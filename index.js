const buttonArr = document.querySelectorAll('button');
const scriptEl = document.getElementById('script-area');
const inputEl = document.getElementById('script-input');
let lastPressed;
console.log(
	buttonArr.forEach((button, idx) => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const expr = e.target.getAttribute('id');
			const keyType = e.target.getAttribute('data-type');
			switch (expr) {
				case 'start-input-script':
					appendKeys(expr, keyType);
					break;
				case 'send-input':
					sendInput(expr, keyType);
					break;
				case 'variable':
					console.log('this is the variable button');
					break;
				case 'input-box':
					showInputBox(expr, keyType);
					break;
				case 'tab':
					send(expr, 'Tab', keyType);
					break;
				case 'enter':
					send(expr, 'Enter', keyType);
					break;
				case 'full-date':
					fullDate();
					break;
				case 'month-name':
					fullMonth();
					break;
				case 'current-time':
					currentTime();
					break;
				case 'arrow-up':
					send(expr, 'Up', keyType);
					break;
				case 'arrow-left':
					send(expr, 'Left', keyType);
					break;
				case 'arrow-right':
					send(expr, 'Right', keyType);
					break;
				case 'arrow-down':
					send(expr, 'Down', keyType);
					break;
				case 'exclamation':
					send(expr, '!', keyType);
					break;
				case 'sleep':
					sendString(`\n Sleep, 300 \n`);
					break;
				case 'return':
					sendString(`\n return \n`);
					break;
				case 'new-line':
					sendString(`\n`);
					break;
			}
		});
	})
);

function sendString(str) {
	return str;
}

function appendKeys(expr, type) {
	if (inputEl.value == '') {
		return alert('the input field is empty');
	}
	if (scriptEl.value != '') {
		return alert('do not put that there, it goes at the beginning, please');
	}
	scriptEl.value += `:R*?:${inputEl.value}::\n`;
	inputEl.value = '';
	lastPressed = expr;
	return;
}

function sendInput(expr, type) {
	if (inputEl.value == '') {
		return alert('the input field is empty');
	}

	scriptEl.value += `SendInput, ${inputEl.value}\n`;
	inputEl.value = '';
	lastPressed = expr;
	return;
}

function send(expr, str, type) {
	let prefix = 'send, ';
	if (lastPressed == expr || type == 'key') {
		console.log(expr.parentElement);
		scriptEl.value += `{${str}}`;
		inputEl.value = '';
		lastPressed = expr;
		return;
	} else {
		scriptEl.value += prefix + '{' + str + '}';
		inputEl.value = '';
		lastPressed = expr;
		return;
	}
}
