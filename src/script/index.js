import Splide from '@splidejs/splide'; //provides all the slider functionality
import '@splidejs/splide/css'; //allow styling of splide in scss
import '../styles/main.scss'; //your styles will get overridden by default splide style if it comes before splide css

//get data from context.json
let data;
try {
    const response = await fetch('./content.json');
    data = await response.json();
} catch {
    alert('Error while fetching data from backend');
}

const navLinks = data.header.nav;
const navBox = document.querySelector('.header__nav-box');
const navLink = document.querySelector('.header__nav-link');
const buttonLinksPrimary = data.header.buttons[0];
const buttonLinksSecondary = data.header.buttons[1];
const btnPrimary = document.querySelectorAll('.header__btn-primary');
const btnSecondary = document.querySelectorAll('.header__btn-secondary');

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

//Header section ends

//Hero Section starts

//accessing required data
const heroSubHeading = data.hero.subHeading;
const heroHeading = data.hero.heading[0];
const heroSubtitle = data.hero.subtitle;

//function to add text to required container
function addText(element, container, text) {
    let para = document.createElement(element);
    document.querySelector(container).prepend(para);
    para.innerHTML = text;
}
//Adding sub Heading
addText('p', '.hero__content-sub-heading', heroSubHeading);

//Adding Heading
let details = `${heroHeading.slice(0, data.hero.heading[1])} <span class="highlight">${heroHeading.slice(data.hero.heading[1], data.hero.heading[2])}</span> ${heroHeading.slice(data.hero.heading[2])}`;
addText('p', '.hero__content-heading', details);

//adding subtitle
addText('p', '.hero__content-subtitle', heroSubtitle);

//Hero Section ends

//Service Section starts

//accessing required data
const serviceSubHeading = data.service.subHeading;
const serviceHeading = data.service.heading;
const serviceSubtitle = data.service.subtitle;

//Adding sub Heading
addText('p', '.service__content-sub-heading', serviceSubHeading);

//Adding Heading
addText('p', '.service__content-heading', serviceHeading);

//adding subtitle
addText('p', '.service__content-subtitle', serviceSubtitle);

//setting card data
const cardData = data.card;
Object.values(cardData).forEach((card) => {
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.classList.add('service__card-block');
    cardContainer.innerHTML = `<h4> ${card.number} </h4><p class="service__card-desc">${card.heading}</p>`;
    document.querySelector('.service__card-layout').appendChild(cardContainer);
});

//Service Section ends

//Testimonial section starts

//Customizing Splide for testimonial section
const splide = new Splide('#testimonial', {
    type: 'loop',
    pagination: true,
});

splide.mount();

//Testimonial section starts
