// Sets the nav and menuBtn.
const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.header__menu-btn');
// Add click event listener to the menu. Toggle the active and active state of the menu.
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  nav.classList.toggle('active');
});
