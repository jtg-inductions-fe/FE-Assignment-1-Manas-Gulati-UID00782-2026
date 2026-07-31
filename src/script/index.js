import '../styles/main.scss';

//get data from context.json
let data;
try {
    const response = await fetch('./content.json');
    data = await response.json();
} catch {
    alert('Error while fetching data from backend');
}

const navLinks = data.header.nav;
const navBox = document.querySelector('.container__nav-box');
const navLink = document.querySelector('.container__nav-link');
const buttonLinksPrimary = data.header.buttons[0];
const buttonLinksSecondary = data.header.buttons[1];
const btnPrimary = document.querySelectorAll('.button--primary');
const btnSecondary = document.querySelectorAll('.button--secondary');

/** fetch required data and append it to necessary container
 *
 * @param {Array} arr
 * @param {HTMLElement} element
 * @param {Container} container
 */
function append(arr, element, container) {
    arr.forEach((link) => {
        let a = document.createElement(element);
        a.setAttribute('tabindex', '1');
        a.innerHTML = link;
        container.prepend(a);
    });
}

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
const menu = document.querySelector('.container__hamburger');
const btnBox = document.querySelector('.container__nav-box-btn');
menu.addEventListener('click', () => {
    navBox.classList.toggle('container__nav-box--active');
    btnBox.classList.toggle('container__nav-box-btn--active');
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
