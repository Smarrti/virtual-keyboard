const buttons = document.querySelectorAll('.button');
buttons.forEach((e) => {
  e.addEventListener('mousedown', (element) => {
    element.target.classList.add('button_active');
  });
  e.addEventListener('mouseup', (element) => {
    element.target.classList.remove('button_active');
	});
});
