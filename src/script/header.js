import { data, append } from './index.js';

const navLinks = data.header.nav;
const navBox = document.querySelector('.header__nav-box');
const navLink = document.querySelector('.header__nav-link');
const buttonLinksPrimary = data.header.buttons[0];
const buttonLinksSecondary = data.header.buttons[1];
const btnPrimary = document.querySelectorAll('.header__btn-primary');
const btnSecondary = document.querySelectorAll('.header__btn-secondary');

//using append() to create nav links
append(navLinks, 'a', navLink);
append(navLinks, 'a', navBox);

//adding button text
btnPrimary.forEach((btnBox) => {
    btnBox.innerHTML = buttonLinksPrimary;
});
btnSecondary.forEach((btnBox) => {
    btnBox.innerHTML = buttonLinksSecondary;
});

//making navBox and Button appear upon clicking on menu
const menu = document.querySelector('.header__hamburger');
const btnBox = document.querySelector('.header__nav-box-btn');
menu.addEventListener('click', () => {
    navBox.classList.toggle('header__nav-box--active');
    btnBox.classList.toggle('header__nav-box-btn--active');
    let expand = menu.getAttribute('aria-expanded');
    let ans;
    let ariaLabel;
    if (expand == 'true') {
        ans = false;
        ariaLabel = 'Menu Closed';
    } else {
        ans = true;
        ariaLabel = 'Menu Opened';
    }
    menu.setAttribute('aria-expanded', ans);
    menu.setAttribute('aria-label', ariaLabel);
});
