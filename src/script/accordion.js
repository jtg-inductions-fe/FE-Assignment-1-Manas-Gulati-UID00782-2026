//selecting necessary elements
const accordionButton = document.querySelectorAll('.accordion__trigger');
const viewPort = window.matchMedia('(min-width: 540px)');

//append a footer list on clicking a button and changes its necessary attributes accordingly
accordionButton.forEach((button) => {
    const icon = button.querySelector('.accordion__icon');
    const accordionList = button.nextElementSibling;
    button.addEventListener('click', () => {
        icon.classList.toggle('accordion__icon--rotate');
        accordionList.classList.toggle('accordion__list--open');

        //reverse aria expanded value and set appropriate aria label
        let expand = button.getAttribute('aria-expanded');
        let ariaLabel;
        const heading = button.querySelector('.accordion__heading');
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

function changeTabFocus() {
    accordionButton.forEach((button) => {
        button.setAttribute('tabindex', viewPort.matches ? '-1' : '0');
    });
}

viewPort.addEventListener('change', changeTabFocus);
changeTabFocus();
