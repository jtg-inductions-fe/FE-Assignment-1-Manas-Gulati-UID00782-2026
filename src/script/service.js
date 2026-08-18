import { loadData, addText } from './index.js';

const template = document.querySelector('#card-layout-template');
const container = document.querySelector('.service__card-layout');

async function service() {
    const data = await loadData();
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
        const clone = template.content.cloneNode(true);
        clone.querySelector('.main-heading-1').textContent = card.number;
        clone.querySelector('.service_card-desc').textContent = card.heading;
        container.appendChild(clone);
    });
}
service();
