import {keyboardRowsRu, keyboardRowsEn, keyboardDictionary} from './constants.js';

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

function getCode(symbol) {const arr = keyboardDictionary.filter((e) => {
  if (e[0] === String(symbol)) {
      return true;
    }
    return false;
  });
  return arr[0][1];
}

function deleteKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  wrapper.removeChild(keyboard);
}

function generateKeyboard(keyboardRows, onShift) {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboardRows.forEach((e) => {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    const retryButtons = {
      shift: 0,
      ctrl: 0,
      alt: 0,
    };
    e.forEach((element) => {
      const button = document.createElement('div');
      button.classList.add('button');
      if (Array.isArray(element)) {
        button.classList.add('button_double');
        button.classList.add(`k${getCode(element[0])}`);
        if (onShift) {
          button.innerHTML += element[1];
        } else {
          button.innerHTML += element[0];
        }
      } else if ((element.length !== 1) && ((element === 'Backspace') || (element === 'Tab') || (element === 'Del') || (element === 'Caps Lock') || (element === 'Enter') || (element === 'Shift') || (element === 'Ctrl'))) {
        button.classList.add('button_darken');
        button.classList.add('button_big');
        button.classList.add(`k${getCode(element)}`);
        button.innerText = element;
      } else if ((element.length !== 1) && ((element === 'Win') || (element === 'Alt') || (element === '▲ ') || (element === '◄ ') || (element === '▼ ') || (element === '► ') || (element === '▲ ') || (element === 'Ctrl '))) {
        button.classList.add('button_darken');
        button.classList.add(`k${getCode(element)}`);
        button.innerText = element;
      } else if ((element.length === 1) && ((element === ' '))) {
        button.classList.add('button_space');
        button.classList.add(`k${getCode(element)}`);
        button.innerText = element;
      } else {
        button.classList.add(`k${getCode(element)}`);
        if (onShift) {
          button.innerText = element.toUpperCase();
        } else {
          button.innerText = element;
        }
      }
      if ((element === 'Shift') && (retryButtons.shift === 0)) {
        button.classList.add('left');
        retryButtons.shift = 1;
      } else if ((element === 'Ctrl') && (retryButtons.ctrl === 0)) {
        button.classList.add('left');
        retryButtons.ctrl = 1;
      } else if ((element === 'Alt') && (retryButtons.alt === 0)) {
        button.classList.add('left');
        retryButtons.alt = 1;
      }
      keyboardRow.appendChild(button);
    });
    keyboard.appendChild(keyboardRow);
  });
  wrapper.appendChild(keyboard);
  document.querySelector('body').appendChild(wrapper);
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((e) => {
    e.addEventListener('mousedown', (element) => {
      element.target.classList.add('button_active');
    });
    e.addEventListener('mouseup', (element) => {
      element.target.classList.remove('button_active');
    });
    e.addEventListener('click', (element) => {
      const texInput = document.querySelector('.text-input');
      if ((element.target.innerText.length === 1) && (!(element.target.innerText === '◄') && !(element.target.innerText === '►'))) {
        texInput.value += element.target.innerText;
      } else {
        const selection = textarea.selectionStart;
        switch (element.target.innerText) {
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
            deleteKeyboard();
            if (capsLock === 0) {
              if (localStorage.getItem('language') === 'ru') {
                generateKeyboard(keyboardRowsRu, true);
              } else {
                generateKeyboard(keyboardRowsEn, true);
              }
              capsLock = 1;
              document.querySelector('.k20').classList.add('button_active');
            } else {
              if (localStorage.getItem('language') === 'ru') {
                generateKeyboard(keyboardRowsRu);
              } else {
                generateKeyboard(keyboardRowsEn);
              }
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
    });
  });
}

const body = document.querySelector('body');
const pushedButtons = [];
body.addEventListener('keydown', (e) => {
  e.preventDefault();
  pushedButtons.push(e.code);
  switch (e.which) {
    case 16: {
      if (capsLock === 0) {
        deleteKeyboard();
        if (localStorage.getItem('language') === 'ru') {
          generateKeyboard(keyboardRowsRu, true);
        } else {
          generateKeyboard(keyboardRowsEn, true);
        }
      }
      break;
    }
    case 8: {
      document.querySelector('.k8').click();
      break;
    }
    default: {
      break;
    }
  }
  let selectedButton = document.querySelector(`.k${e.which}`);
  if ((e.code === 'ShiftRight') || (e.code === 'ControlRight') || (e.code === 'AltRight')) {
    selectedButton = document.querySelector(`.k${e.which}:not(.left)`);
  }
  selectedButton.classList.add('button_active');
  selectedButton.click();
});
body.addEventListener('keyup', (e) => {
  e.preventDefault();
  const selectedButton = document.querySelectorAll(`.k${e.which}`);
  selectedButton.forEach((element) => {
    element.classList.remove('button_active');
  });
  if ((pushedButtons.indexOf('ShiftLeft') !== -1) && (pushedButtons.indexOf('AltLeft') !== -1)) {
    deleteKeyboard();
    if (localStorage.getItem('language') === 'ru') {
      localStorage.setItem('language', 'en');
      generateKeyboard(keyboardRowsEn);
    } else {
      localStorage.setItem('language', 'ru');
      generateKeyboard(keyboardRowsRu);
    }
    while (pushedButtons.indexOf('ShiftLeft') !== -1) {
      pushedButtons.splice(pushedButtons.indexOf('ShiftLeft'), 1);
    }
    while (pushedButtons.indexOf('AltLeft') !== -1) {
      pushedButtons.splice(pushedButtons.indexOf('AltLeft'), 1);
    }
  } else if ((e.which === 16) && (capsLock === 0)) {
    deleteKeyboard();
    if (localStorage.getItem('language') === 'ru') {
      generateKeyboard(keyboardRowsRu);
    } else {
      generateKeyboard(keyboardRowsEn);
    }
  }
  while (pushedButtons.indexOf(e.code) !== -1) {
    pushedButtons.splice(pushedButtons.indexOf(e.code), 1);
  }
});

if (localStorage.getItem('language') === 'ru') {
  generateKeyboard(keyboardRowsRu);
} else {
  generateKeyboard(keyboardRowsEn);
}
