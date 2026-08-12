import Splide from '@splidejs/splide'; //provides all the slider functionality
import '@splidejs/splide/css'; //allow styling of splide in scss
import '../styles/main.scss'; //your styles will get overridden by default splide style if it comes before splide css

/** fetch data from backend url
 *
 * @param {String} url
 * @param {Variable} data
 */
export async function getData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch {
        alert('Error while fetching data from backend');
    }
}

/** fetch required data and append it to necessary container
 *
 * @param {Array} arr
 * @param {HTMLElement} element
 * @param {Container} container
 */
export function append(arr, element, container) {
    arr.forEach((link) => {
        let a = document.createElement(element);
        a.setAttribute('tabindex', '1');
        a.setAttribute('href', link[1]);
        a.setAttribute('class', link[0].replaceAll(' ', '-'));
        a.textContent = link[0];
        container.prepend(a);
    });
}

/** fetch required data and append it to necessary container
 *
 * @param {HTMLElement} element
 * @param {Container} container
 * @param {String} text
 */
export function addText(element, container, text) {
    let para = document.createElement(element);
    document.querySelector(container).prepend(para);
    para.textContent = text;
}

//Customizing Splide for testimonial section
const splide = new Splide('#testimonial', {
    type: 'loop',
});

splide.mount();

/** copies text to clipboard
 *
 * @param {String} text
 */
export async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        alert('Failed to copy text, please try again');
    }
}

/** sets a common clone data to respective fields
 *
 * @param {HTMLElement} clone
 * @param {Object} info
 * @param {Date} expiry
 *
 */
export function setTemplate(clone, info, expiry) {
    clone.querySelector('.modal__reward-won-label').textContent = info.label;
    clone.querySelector('.modal__reward-won-expiry').textContent =
        `Expires in ${expiry}d`;
    clone.querySelector('.modal__reward-won-promo').textContent =
        info.promoCode;
}
