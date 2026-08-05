import { data, addText } from './index.js';

//accessing required data
const heroSubHeading = data.hero.subHeading;
const heroHeading = data.hero.heading[0];
const heroSubtitle = data.hero.subtitle;

//Adding sub Heading
addText('p', '.hero__content-sub-heading', heroSubHeading);

//Adding Heading
let details = `${heroHeading.slice(0, data.hero.heading[1])} <span class="highlight">${heroHeading.slice(data.hero.heading[1], data.hero.heading[2])}</span> ${heroHeading.slice(data.hero.heading[2])}`;
addText('p', '.hero__content-heading', details);

//adding subtitle
addText('p', '.hero__content-subtitle', heroSubtitle);
