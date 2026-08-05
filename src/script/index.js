import Splide from '@splidejs/splide'; //provides all the slider functionality
import '@splidejs/splide/css'; //allow styling of splide in scss
import '../styles/main.scss'; //your styles will get overridden by default splide style if it comes before splide css

//get data from context.json
export let data;
try {
    const response = await fetch('./content.json');
    data = await response.json();
} catch {
    alert('Error while fetching data from backend');
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
        a.textContent = link;
        container.prepend(a);
    });
}

//function to add text to required container
export function addText(element, container, text) {
    let para = document.createElement(element);
    document.querySelector(container).prepend(para);
    para.textContent = text;
}

//Customizing Splide for testimonial section
const splide = new Splide('#testimonial', {
    type: 'loop',
    pagination: true,
});

splide.mount();
