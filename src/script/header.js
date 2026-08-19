import { loadData, append } from './utils.js';

//selecting necessary elements
const navBox = document.querySelector('.header__nav-box');
const navLink = document.querySelector('.header__nav-link');
const btnPrimary = document.querySelectorAll('.header__btn-primary');
const btnSecondary = document.querySelectorAll('.header__btn-secondary');
const menu = document.querySelector('.header__hamburger');
const btnBox = document.querySelector('.header__nav-box-btn');
const headerLogo = document.querySelector('.header__logo');
const viewPort = window.matchMedia('(max-width: 540px)');

//fetching data
async function header() {
    const data = await loadData();
    const navLinks = data.header.nav;
    //using append() to create nav links
    append(navLinks, 'a', navLink);
    append(navLinks, 'a', navBox);
    //adding button text
    btnPrimary.forEach((btnBox) => {
        btnBox.textContent = data.header.buttons[0];
    });
    btnSecondary.forEach((btnBox) => {
        btnBox.textContent = data.header.buttons[1];
    });
}
header();

//making navBox and Button appear upon clicking on menu
menu.addEventListener('click', () => {
    navBox.classList.toggle('header__nav-box--active');
    btnBox.classList.toggle('header__nav-box-btn--active');

    //Setting correct aria properties
    let expand = menu.getAttribute('aria-expanded');
    if (expand == 'true') {
        menu.setAttribute('aria-expanded', false);
        menu.setAttribute('aria-label', 'Menu Closed');
    } else {
        menu.setAttribute('aria-expanded', true);
        menu.setAttribute('aria-label', 'Menu Opened');
    }
});

function changeTabFocus() {
    headerLogo.setAttribute('tabindex', viewPort.matches ? '1' : '0');
}

viewPort.addEventListener('change', changeTabFocus);
changeTabFocus();
