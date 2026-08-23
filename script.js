// Find all menu buttons and all page sections.
const menuButtons = document.querySelectorAll('.menu-button');
const pageSections = document.querySelectorAll('.page-section');
const themeButton = document.querySelector('#theme-button');

// Show the section selected by the visitor.
function showSection(sectionId) {
  pageSections.forEach(function (section) {
    section.classList.toggle('hidden', section.id !== sectionId);
  });

  menuButtons.forEach(function (button) {
    button.classList.toggle('active', button.dataset.section === sectionId);
  });
}

// Listen for clicks on each menu button.
menuButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    showSection(button.dataset.section);
  });
});

// Change between light mode and dark mode.
themeButton.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  const darkModeIsOn = document.body.classList.contains('dark-mode');
  themeButton.textContent = darkModeIsOn ? 'Light mode' : 'Dark mode';
  localStorage.setItem('darkMode', darkModeIsOn);
});

// Restore the visitor's previous theme choice.
const savedDarkMode = localStorage.getItem('darkMode') === 'true';

if (savedDarkMode) {
  document.body.classList.add('dark-mode');
  themeButton.textContent = 'Light mode';
}
