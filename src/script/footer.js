const accordionButton = document.querySelectorAll('.footer__accordion-trigger');

//append a footer list on clicking a button and changes its necessary attributes accordingly
accordionButton.forEach((button) => {
    const icon = button.querySelector('.footer__accordion-icon');
    const accordionList = button.nextElementSibling;
    button.addEventListener('click', () => {
        icon.classList.toggle('footer__accordion-icon--visible');
        accordionList.classList.toggle('footer__accordion-list--open');
        let expand = button.getAttribute('aria-expanded');
        let ans;
        let ariaLabel;
        if (expand == 'true') {
            ans = false;
            ariaLabel = `${button.querySelector('.footer__accordion-heading').textContent} list close`;
        } else {
            ans = true;
            ariaLabel = `${button.querySelector('.footer__accordion-heading').textContent} list open`;
        }
        button.setAttribute('aria-expanded', ans);
        button.setAttribute('aria-label', ariaLabel);
    });
});
