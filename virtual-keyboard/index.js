const keyboardRowsRu = [['ё', [1, '!'], [2, '"'], [3, '№'], [4, ';'], [5, '%'], [6, ':'], [7, '?'], [8, '*'], [9, '('], [0, ')'], ['-', '_'], ['=', '+'], 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', ['\\', '/'], 'Del'], ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲ ', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄ ', '▼ ', '► ', 'Ctrl ']];
const keyboardRowsEn = [['`', [1, '!'], [2, '@'], [3, '#'], [4, '$'], [5, '%'], [6, '^'], [7, '&'], [8, '*'], [9, '('], [0, ')'], ['-', '_'], ['=', '+'], 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'], ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ['\'', '"'], 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], '▲ ', 'Shift'], ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄ ', '▼ ', '► ', 'Ctrl ']];
let capsLock = 0;

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
const notify = document.createElement('p');
notify.innerText = 'Виртуальная клавиатура разрабатывалась под Windows OS\nДля переключения языка используйте сочетание клавиш Shift + Alt';
wrapper.appendChild(notify);
const text = document.createElement('div');
text.classList.add('text');
const textarea = document.createElement('textarea');
textarea.classList.add('text-input');
text.appendChild(textarea);
wrapper.appendChild(text);

function getCode(symbol) {
  const keyboardDictionary = [['ё', '192'], ['1', '49'], ['2', '50'], ['3', '51'], ['4', '52'], ['5', '53'], ['6', '54'], ['7', '55'], ['8', '56'], ['9', '57'], ['0', '48'], ['-', '189'], ['=', '187'], ['Backspace', '8'], ['Tab', '9'], ['q', '81'], ['w', '87'], ['e', '69'], ['r', '82'], ['t', '84'], ['y', '89'], ['u', '85'], ['i', '73'], ['o', '79'], ['p', '80'], ['[', '219'], [']', '221'], ['\\', '220'], ['Del', '46'], ['Caps Lock', '20'], ['a', '65'], ['s', '83'], ['d', '68'], ['f', '70'], ['g', '71'], ['h', '72'], ['j', '74'], ['k', '75'], ['l', '76'], [';', '186'], ['\'', '222'], ['Enter', '13'], ['Shift', '16'], ['z', '90'], ['x', '88'], ['c', '67'], ['v', '86'], ['b', '66'], ['n', '78'], ['m', '77'], [',', '188'], ['.', '190'], ['/', '191'], ['Shift', '16'], ['▲ ', '38'], ['Ctrl', '17'], ['Ctrl ', '17'], ['Win', '91'], ['Alt', '18'], ['◄ ', '37'], ['▼ ', '40'], ['► ', '39'], ['й', '81'], ['ц', '87'], ['у', '69'], ['к', '82'], ['е', '84'], ['н', '89'], ['г', '85'], ['ш', '73'], ['щ', '79'], ['з', '80'], ['х', '219'], ['ъ', '221'], ['ф', '65'], ['ы', '83'], ['в', '68'], ['а', '70'], ['п', '71'], ['р', '72'], ['о', '74'], ['л', '75'], ['д', '76'], ['ж', '186'], ['э', '222'], ['я', '90'], ['ч', '88'], ['с', '67'], ['м', '86'], ['и', '66'], ['т', '78'], ['ь', '77'], ['б', '188'], ['ю', '190'], ['.', '191'], [' ', '32'], ['`', '192']];
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
            const value = [textarea.value];
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
      deleteKeyboard();
      if (localStorage.getItem('language') === 'ru') {
        generateKeyboard(keyboardRowsRu, true);
      } else {
        generateKeyboard(keyboardRowsEn, true);
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
  } else if (e.which === 16) {
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
