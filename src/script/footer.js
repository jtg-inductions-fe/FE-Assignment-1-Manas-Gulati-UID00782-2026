//selecting necessary elements
const accordionButton = document.querySelectorAll('.footer__accordion-trigger');

//append a footer list on clicking a button and changes its necessary attributes accordingly
accordionButton.forEach((button) => {
    const icon = button.querySelector('.footer__accordion-icon');
    const accordionList = button.nextElementSibling;
    button.addEventListener('click', () => {
        icon.classList.toggle('footer__accordion-icon--rotate');
        accordionList.classList.toggle('footer__accordion-list--open');

        //reverse aria expanded value and set appropriate aria label
        let expand = button.getAttribute('aria-expanded');
        let ariaLabel;
        const heading = button.querySelector('.footer__accordion-heading');
        if (expand == 'true') {
            button.setAttribute('aria-expanded', false);
            ariaLabel = `${heading.textContent} list open`;
        } else {
            button.setAttribute('aria-expanded', true);
            ariaLabel = `${heading.textContent} list close`;
        }
        button.setAttribute('aria-label', ariaLabel);
    });
});
