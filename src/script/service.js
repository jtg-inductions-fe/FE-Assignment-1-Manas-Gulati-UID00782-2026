import { data, addText } from './index.js';

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
    cardContainer.innerHTML = `<h4 class="main-heading-1"> ${card.number} </h4><p class="service__card-desc subtitle-1">${card.heading}</p>`;
    document.querySelector('.service__card-layout').appendChild(cardContainer);
});
