const buttonArr = document.querySelectorAll('button');
const scriptEl = document.getElementById('script-area');
const inputEl = document.getElementById('script-input');
let lastPressed;
console.log(
	buttonArr.forEach((button, idx) => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const expr = e.target.getAttribute('id');
			switch (expr) {
				case 'start-input-script':
					appendKeys(expr);
					break;
				case 'send-input':
					sendInput(expr);
					break;
				case 'variable':
					console.log('this is the variable button');
					break;
				case 'input-box':
					showInputBox(expr);
					break;
				case 'tab':
					send(expr, 'Tab');
			}
		});
	})
);

function appendKeys(expr) {
	if (inputEl.value == '') {
		return alert('the input field is empty');
	}
	scriptEl.value += `:R*?:${inputEl.value}::\n`;
	inputEl.value = '';
	lastPressed = expr;
	return;
}

function sendInput(expr) {
	if (inputEl.value == '') {
		return alert('the input field is empty');
	}

	scriptEl.value += `SendInput, ${inputEl.value}\n`;
	inputEl.value = '';
	lastPressed = expr;
	return;
}

function send(expr, str) {
	let prefix = 'send, ';
	if (lastPressed == expr) {
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
