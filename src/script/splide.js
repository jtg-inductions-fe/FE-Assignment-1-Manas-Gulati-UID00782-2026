import Splide from '@splidejs/splide'; //provides all the slider functionality

//Customizing Splide for testimonial section
const splide = new Splide('#testimonial', {
    type: 'loop',
});

splide.mount();
