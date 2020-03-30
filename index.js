const buttons = document.querySelectorAll('.button');
buttons.forEach((e) => {
  e.addEventListener('mousedown', (element) => {
    element.target.classList.add('button_active');
  });
  e.addEventListener('mouseup', (element) => {
    element.target.classList.remove('button_active');
  });
  e.addEventListener('click', (element) => {
    const textarea = document.querySelector('.text-input');
    textarea.value += element.target.innerText;
  });
});
