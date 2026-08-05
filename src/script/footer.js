const accordionButton = document.querySelectorAll('.footer__accordion-trigger');

accordionButton.forEach((button) => {
    const icon = button.querySelector('.footer__accordion-icon');
    const accordionList = button.nextElementSibling;
    button.addEventListener('click', () => {
        icon.classList.toggle('footer__accordion-icon--visible');
        accordionList.classList.toggle('footer__accordion-list--open');
    });
});
