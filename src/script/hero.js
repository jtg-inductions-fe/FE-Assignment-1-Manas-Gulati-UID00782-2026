import { data, addText } from './index.js';

//accessing required data
const heroSubHeading = data.hero.subHeading;
const heroHeading = data.hero.heading[0];
const heroSubtitle = data.hero.subtitle;

//Adding sub Heading
addText('p', '.hero__content-sub-heading', heroSubHeading);

//Adding Heading
const template = document.querySelector('#hero-content-heading-template');
const container = document.querySelector('.hero__content-heading');
const clone = template.content.cloneNode(true);

clone.querySelector('.before-highlight').textContent = heroHeading.slice(
    0,
    data.hero.heading[1],
);
clone.querySelector('.highlight').textContent = heroHeading.slice(
    data.hero.heading[1],
    data.hero.heading[2],
);
clone.querySelector('.after-highlight').textContent = heroHeading.slice(
    data.hero.heading[2],
);
container.appendChild(clone);

//adding subtitle
addText('p', '.hero__content-subtitle', heroSubtitle);
