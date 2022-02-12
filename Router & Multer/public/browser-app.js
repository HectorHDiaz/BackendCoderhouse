const navToggle = document.querySelector('.nav-toggle')
const links = document.querySelector('.links')

navToggle.addEventListener('click', function () {
  links.classList.toggle('show-links')
})

const clearFile = (type) => {
  const file = type === 'single' ? document.getElementById('archivo') : document.getElementById('archivos');
  file.value = "";
};
