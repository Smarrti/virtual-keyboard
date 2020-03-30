const keyboardRowsRu = [['ё', [1, '!'], [2, '"'], [3, '№'], [4, ';'], [5, '%'], [6, ':'], [7, '?'], [8, '*'], [9, '('], [0, ')'], ['-', '_'], ['=', '+'], 'Backspace'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', ['\\', '/'], 'Del'], ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'], ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '▲ ', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄ ', '▼ ', '► ', 'Ctrl ']];
const keyboardRowsEn = [['`', [1, '!'], [2, '@'], [3, '#'], [4, '$'], [5, '%'], [6, '^'], [7, '&'], [8, '*'], [9, '('], [0, ')'], ['-', '_'], ['=', '+'], 'Backspace'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'], ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', [';', ':'], ['\'', '"'], 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', [',', '<'], ['.', '>'], ['/', '?'], '▲ ', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄ ', '▼ ', '► ', 'Ctrl ']];
function generateKeyboard(keyboardRows) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const text = document.createElement('div');
  text.classList.add('text');
  const textarea = document.createElement('textarea');
  textarea.classList.add('text-input');
  text.appendChild(textarea);
  wrapper.appendChild(text);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboardRows.forEach((e) => {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    e.forEach((element) => {
      const button = document.createElement('div');
      button.classList.add('button');
      if (Array.isArray(element)) {
        button.classList.add('button_double');
        const buttonUp = document.createElement('span');
        buttonUp.classList.add('button_up');
        buttonUp.innerText = [element[1]];
        button.appendChild(buttonUp);
        button.innerHTML += element[0];
      } else if ((element.length !== 1) && ((element === 'Backspace') || (element === 'Tab') || (element === 'Del') || (element === 'Caps Lock') || (element === 'Enter') || (element === 'Shift') || (element === 'Ctrl'))) {
        button.classList.add('button_darken');
        button.classList.add('button_big');
        button.innerText = element;
      } else if ((element.length !== 1) && ((element === 'Win') || (element === 'Alt') || (element === '▲ ') || (element === '◄ ') || (element === '▼ ') || (element === '► ') || (element === '▲ ') || (element === 'Ctrl '))) {
        button.classList.add('button_darken');
        button.innerText = element;
      } else if ((element.length === 1) && ((element === ' '))) {
        button.classList.add('button_space');
        button.innerText = element;
      } else {
        button.innerText = element;
      }
      keyboardRow.appendChild(button);
    });
    keyboard.appendChild(keyboardRow);
  });
  wrapper.appendChild(keyboard);
  document.querySelector('body').appendChild(wrapper);
}

generateKeyboard(keyboardRowsEn);
