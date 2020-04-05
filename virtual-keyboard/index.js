const keyboardRowsRu = [['ё', [1, '!'], [2, '"'], [3, '№'], [4, ';'], [5, '%'], [6, ':'], [7, '?'], [8, '*'], [9, '('], [0, ')'], ['-', '_'], ['=', '+'], 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', ['\\', '/'], 'Del'], ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲ ', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄ ', '▼ ', '► ', 'Ctrl']];
const keyboardRowsEn = [['`', [1, '!'], [2, '@'], [3, '#'], [4, '$'], [5, '%'], [6, '^'], [7, '&'], [8, '*'], [9, '('], [0, ')'], ['-', '_'], ['=', '+'], 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'], ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ['\'', '"'], 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], '▲ ', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄ ', '▼ ', '► ', 'Ctrl']];
const keyboardDictionary = [['ё', '192'], ['1', '49'], ['2', '50'], ['3', '51'], ['4', '52'], ['5', '53'], ['6', '54'], ['7', '55'], ['8', '56'], ['9', '57'], ['0', '48'], ['-', '189'], ['=', '187'], ['Backspace', '8'], ['Tab', '9'], ['q', '81'], ['w', '87'], ['e', '69'], ['r', '82'], ['t', '84'], ['y', '89'], ['u', '85'], ['i', '73'], ['o', '79'], ['p', '80'], ['[', '219'], [']', '221'], ['\\', '220'], ['Del', '46'], ['Caps Lock', '20'], ['a', '65'], ['s', '83'], ['d', '68'], ['f', '70'], ['g', '71'], ['h', '72'], ['j', '74'], ['k', '75'], ['l', '76'], [';', '186'], ['\'', '222'], ['Enter', '13'], ['Shift', '16'], ['z', '90'], ['x', '88'], ['c', '67'], ['v', '86'], ['b', '66'], ['n', '78'], ['m', '77'], [',', '188'], ['.', '190'], ['/', '191'], ['Shift', '16'], ['▲ ', '38'], ['Ctrl', '17'], ['Win', '91'], ['Alt', '18'], ['◄ ', '37'], ['▼ ', '40'], ['► ', '39'], ['й', '81'], ['ц', '87'], ['у', '69'], ['к', '82'], ['е', '84'], ['н', '89'], ['г', '85'], ['ш', '73'], ['щ', '79'], ['з', '80'], ['х', '219'], ['ъ', '221'], ['ф', '65'], ['ы', '83'], ['в', '68'], ['а', '70'], ['п', '71'], ['р', '72'], ['о', '74'], ['л', '75'], ['д', '76'], ['ж', '186'], ['э', '222'], ['я', '90'], ['ч', '88'], ['с', '67'], ['м', '86'], ['и', '66'], ['т', '78'], ['ь', '77'], ['б', '188'], ['ю', '190'], ['.', '191'], [' ', '32'], ['`', '192']];
const serviceKeys = ['Backspace', 'Tab', 'Del', 'Caps Lock', 'Enter', 'Shift', 'Ctrl'];

let capsLock = 0;

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
const instruction = document.createElement('p');
instruction.innerText = 'Виртуальная клавиатура разрабатывалась под Windows OS\nДля переключения языка используйте сочетание клавиш Shift + Alt';
wrapper.appendChild(instruction);
const text = document.createElement('div');
text.classList.add('text');
const textarea = document.createElement('textarea');
textarea.classList.add('text-input');
text.appendChild(textarea);
wrapper.appendChild(text);

function getCode(symbol) {
  const arr = keyboardDictionary.filter((e) => {
    if (e[0] === String(symbol)) {
      return true;
    }
    return false;
  });
  return arr[0][1];
}

function deleteKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  if (keyboard !== null) {
    wrapper.removeChild(keyboard);
  }
}

function generateKeyboard(keyboardRows, onShift) {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboardRows.forEach((rows) => {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    const retryButtons = {
      shift: 0,
      ctrl: 0,
      alt: 0,
    };
    rows.forEach((letter) => {
      const button = document.createElement('div');
      button.classList.add('button');
      if (Array.isArray(letter)) {
        button.classList.add('button_double');
        button.classList.add(`k${getCode(letter[0])}`);
        if (onShift) {
          button.innerHTML += letter[1];
        } else {
          button.innerHTML += letter[0];
        }
      } else if (letter.length !== 1) {
        if (serviceKeys.indexOf(letter) !== -1) {
          if (!((letter === 'Ctrl') && (retryButtons.ctrl === 1))) {
            button.classList.add('button_big');
          }
        }
        button.classList.add('button_darken');
      } else if ((letter.length === 1) && ((letter === ' '))) {
        button.classList.add('button_space');
      }
      if (!(Array.isArray(letter))) {
        button.classList.add(`k${getCode(letter)}`);
        if ((onShift) && (!(letter.length !== 1))) {
          button.innerText = letter.toUpperCase();
        } else {
          button.innerText = letter;
        }
      }
      if ((letter === 'Shift') && (retryButtons.shift === 0)) {
        button.classList.add('left');
        retryButtons.shift = 1;
      } else if ((letter === 'Ctrl') && (retryButtons.ctrl === 0)) {
        button.classList.add('left');
        retryButtons.ctrl = 1;
      } else if ((letter === 'Alt') && (retryButtons.alt === 0)) {
        button.classList.add('left');
        retryButtons.alt = 1;
      }
      keyboardRow.appendChild(button);
    });
    keyboard.appendChild(keyboardRow);
  });
  wrapper.appendChild(keyboard);
  document.querySelector('body').appendChild(wrapper);
  function buttonMouseDown(buttonEvent) {
    buttonEvent.classList.add('button_active');
  }
  function buttonMouseUp(buttonEvent) {
    buttonEvent.classList.remove('button_active');
  }
  function buttonMouseClick(buttonEvent) {
    const texInput = document.querySelector('.text-input');
    const buttonText = buttonEvent.innerText;
    if ((buttonText.length === 1) && (!(buttonText === '◄') && !(buttonText === '►'))) {
      texInput.value += buttonText;
    } else {
      const selection = textarea.selectionStart;
      switch (buttonText) {
        case '': {
          texInput.value += ' ';
          break;
        }
        case 'Backspace': {
          textarea.value = textarea.value.substring(0, textarea.value.length - 1);
          break;
        }
        case 'Enter': {
          textarea.value += '\n';
          break;
        }
        case 'Del': {
          const [value] = [textarea.value];
          textarea.value = value.slice(0, selection) + value.slice(selection + 1, value.length);
          textarea.selectionStart = selection;
          textarea.selectionEnd = selection;
          break;
        }
        case '◄': {
          textarea.selectionStart = selection - 1;
          textarea.selectionEnd = selection - 1;
          break;
        }
        case '►': {
          textarea.selectionStart = selection + 1;
          textarea.selectionEnd = selection + 1;
          break;
        }
        case 'Caps Lock': {
          if (capsLock === 0) {
            generateWithLocalStorage(true);
            capsLock = 1;
            document.querySelector('.k20').classList.add('button_active');
          } else {
            generateWithLocalStorage(false);
            capsLock = 0;
          }
          break;
        }
        default: {
          break;
        }
      }
    }
    textarea.focus();
  }
  keyboard.addEventListener('mousedown', (mouse) => {
    const { target } = mouse;
    if (target.tagName !== 'DIV') {
      return;
    }
    buttonMouseDown(target);
  });
  keyboard.addEventListener('mouseup', (mouse) => {
    const { target } = mouse;
    if (target.tagName !== 'DIV') {
      return;
    }
    buttonMouseUp(target);
  });
  keyboard.addEventListener('click', (mouse) => {
    const { target } = mouse;
    if (target.tagName !== 'DIV') {
      return;
    }
    buttonMouseClick(target);
  });
}

function generateWithLocalStorage(shift) {
  deleteKeyboard();
  if (localStorage.getItem('language') === 'ru') {
    generateKeyboard(keyboardRowsRu, shift);
  } else {
    generateKeyboard(keyboardRowsEn, shift);
  }
}

const body = document.querySelector('body');
const pushedButtons = [];
body.addEventListener('keydown', (key) => {
  key.preventDefault();
  pushedButtons.push(key.code);
  const shiftButton = 16;
  const backspaceButton = 8;
  switch (key.which) {
    case shiftButton: {
      if (capsLock === 0) {
        generateWithLocalStorage(true);
      }
      break;
    }
    case backspaceButton: {
      document.querySelector('.k8').click();
      break;
    }
    default: {
      break;
    }
  }
  let selectedButton = document.querySelector(`.k${key.which}`);
  if ((key.code === 'ShiftRight') || (key.code === 'ControlRight') || (key.code === 'AltRight')) {
    selectedButton = document.querySelector(`.k${key.which}:not(.left)`);
  }
  selectedButton.classList.add('button_active');
  selectedButton.click();
});
body.addEventListener('keyup', (key) => {
  key.preventDefault();
  const selectedButton = document.querySelectorAll(`.k${key.which}`);
  selectedButton.forEach((element) => {
    element.classList.remove('button_active');
  });
  if ((pushedButtons.indexOf('ShiftLeft') !== -1) && (pushedButtons.indexOf('AltLeft') !== -1)) {
    if (localStorage.getItem('language') === 'ru') {
      localStorage.setItem('language', 'en');
    } else {
      localStorage.setItem('language', 'ru');
    }
    generateWithLocalStorage(capsLock);
    
    while (pushedButtons.indexOf('ShiftLeft') !== -1) {
      pushedButtons.splice(pushedButtons.indexOf('ShiftLeft'), 1);
    }
    while (pushedButtons.indexOf('AltLeft') !== -1) {
      pushedButtons.splice(pushedButtons.indexOf('AltLeft'), 1);
    }
  } else if ((key.which === 16) && (capsLock === 0)) {
    generateWithLocalStorage();
  }
  while (pushedButtons.indexOf(key.code) !== -1) {
    pushedButtons.splice(pushedButtons.indexOf(key.code), 1);
  }
});

generateWithLocalStorage();