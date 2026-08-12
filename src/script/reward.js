import { setTemplate, getData, copyText } from './index.js';
const totalQuadrants = 4;

//fetching data
const url =
    'https://gist.githubusercontent.com/ameer-wajid-ali/1f29ebee4295cede36f8d74b45e576df/raw/122966c9a123861249f173911d8d93a76dc06d7a/';
let data;
try {
    data = await getData(url);
} catch (e) {
    alert(e.message);
}
let userData = JSON.parse(localStorage.getItem('localUserData'));
let availableRewards = {};
let selectedRewards = {};

//create a copy of all deals with promocode acting as primary key for this object
if (data) {
    Object.values(data).forEach((reward) => {
        availableRewards[reward.promoCode] = reward;
    });
}

//if no user data present in local storage, we assume a new user is detected
if (userData === null) {
    //initialize blank state for new user
    userData = {};
} else {
    const now = Date.now();
    //user recognized: fetch the user's existing data and remove deals that user already has access to, to prevent duplicate deals
    Object.values(userData).forEach((userReward) => {
        if (userReward.expiryAt > now) {
            delete availableRewards[userReward.promoCode];
        }
    });
}

//selecting all necessary elements
const header = document.querySelector('.header'); //event delegation for header link: special deals
const backdrop = document.querySelector('.backdrop');
const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const dealSwitch = document.querySelector('.modal__deal-switch');
const deals = document.querySelector('.modal__deals');
const winnings = document.querySelector('.modal__win');
const spin = document.querySelector('.modal__spin');
const spinWheel = document.querySelector('.modal__spin-wheel');
const spinBtn = document.querySelector('.modal__spin-btn');
const template = document.querySelector('.modal__template-reward-won');
const dealCount = document.querySelector('.modal__deal-count');

//function declarations
/** select random number of deals from available pool of rewards
 *
 * @param {Integer} division
 *
 */
function randomSelection(division = totalQuadrants) {
    selectedRewards = {};
    //selecting n random rewards for spin wheel, where n is number of quadrants in spin wheel
    let i = 1;
    while (i <= division) {
        let availableRewardsArray = Object.values(availableRewards);
        //selecting random index to choose a random deal from available rewards
        const randomNum = Math.floor(
            Math.random() * availableRewardsArray.length,
        );
        const quadrant = spinWheel.querySelector(`div:nth-child(${i})>p`);
        const shortlistedReward = availableRewardsArray[randomNum];
        //try-catch block to handle edge case: if available rewards<no. of quadrants
        if (shortlistedReward) {
            quadrant.textContent = shortlistedReward.label;
            selectedRewards[shortlistedReward.promoCode] = shortlistedReward; //add rewards to selectedRewards to use later to get 1 win item
            delete availableRewards[shortlistedReward.promoCode]; //remove selected rewards from availableRewards to avoid duplicates
        } else {
            quadrant.textContent = 'Error';
        }
        i++;
    }
}

/** calculate time left before deals expire
 *
 * @param {time} expiryTime
 *
 */
function timeLeft(expiryTime) {
    return Math.ceil((expiryTime - Date.now()) / (1000 * 60 * 60 * 24)); //math.ceil is used to find nearest whole number day left before deal expires
}

/** add rewards to deals section
 *
 * @param {time} expiryTime
 * @param {Object} reward
 *
 */
function addToDeals(expiryTime, reward) {
    const expiryIn = timeLeft(expiryTime);
    const clone = template.content.cloneNode(true);
    const unwantedPara = clone.querySelector('.modal__you-won-text');
    unwantedPara.remove(); //removes "You Won!" para from deals section as it isn't needed here
    setTemplate(clone, reward, expiryIn);

    if (expiryIn <= 0) {
        clone
            .querySelector('.modal__reward-won')
            .classList.add('deal--expired');
        clone.querySelector('.modal__reward-won-expiry').textContent =
            `Expired`;
        clone
            .querySelector('.modal__icon-copy-btn')
            .setAttribute('disabled', true); //disable copy button for expired deals
    }
    deals.append(clone);
}

/** display promocode copy confirmation message
 *
 * @param {HTMLElement} container
 * @param {Event} e
 *
 */
function promoCopy(container, e) {
    if (
        e.target.className == 'icon-copy' ||
        e.target.className == 'modal__icon-copy-btn'
    ) {
        let promoParent = e.target.closest('.modal__reward-won-code');
        copyText(
            promoParent.querySelector('.modal__reward-won-promo').textContent,
        );
        container.classList.add('modal__code-copied--active');
        setTimeout(() => {
            container.classList.remove('modal__code-copied--active');
        }, 2500);
    }
}

//add backdrop to body when special deals is clicked
header.addEventListener('click', (e) => {
    if (e.target.className === 'special-deals') {
        e.preventDefault(); //stops reload of page: prevent a tags default behavior
        //make scroll disable
        backdrop.classList.add('backdrop--active');
        body.classList.add('body--no-scroll');
        //make modal visible
        modal.showModal();
        modal.classList.add('modal--active');
        modal.setAttribute('aria-label', 'Spin wheel close');
    }
});

//close modal when close button is clicked
closeModal.addEventListener('click', () => {
    backdrop.classList.remove('backdrop--active');
    body.classList.remove('body--no-scroll');
    modal.close();
    modal.classList.remove('modal--active');
    modal.setAttribute('aria-label', 'Spin wheel open');
});

modal.addEventListener('close', () => {
    body.classList.remove('body--no-scroll');
    modal.classList.remove('modal--active');
    backdrop.classList.remove('backdrop--active');
});
//this is necessary because close modal auto trigger esc key close modal functionality

//switch to deal section
dealSwitch.addEventListener('click', () => {
    deals.classList.toggle('modal__deals--active');
    winnings.classList.toggle('modal__win--active');
    spin.classList.toggle('modal__spin--active');
});

//function call to select random deals for first time after refresh
randomSelection();

//setting deal count
let totalDeals = Object.keys(userData).length;
dealCount.textContent = totalDeals;

//adding data to deals section
let userDataArray = Object.values(userData);
userDataArray.sort((a, b) => a.expiryAt - b.expiryAt);
userDataArray.forEach((deal) => {
    addToDeals(userData[deal.promoCode].expiryAt, deal);
});

//add spin functionality
let validFlag = true;
let currentRotation = 0;
spinBtn.addEventListener('click', () => {
    if (!validFlag) {
        randomSelection();
    }

    if (Object.values(selectedRewards).length < totalQuadrants) {
        alert('You have hit the maximum limit to redeem rewards'); //edge case handling
        return; //exit the event listener
    }

    //disable button when wheel is spinning
    spinBtn.setAttribute('disabled', 'true');
    spinBtn.textContent = 'Spin Again';

    //selecting random reward for win
    const randomNum = Math.floor(
        Math.random() * Object.values(selectedRewards).length,
    );
    let winReward = Object.values(selectedRewards)[randomNum];
    const randomDegree = Math.floor(Math.random() * 70) + 10; //this is done to prevent the spin pointer to land on blank white lines in between quadrants
    const winDegree = 360 - (randomDegree + 90 * randomNum); //degree is calculated clockwise but spin happens anti, so to balance that and land on correct option
    const currentWheelPos = currentRotation % 360;
    let requiredRotation = winDegree - currentWheelPos;
    if (requiredRotation < 0) {
        requiredRotation += 360;
    }
    currentRotation += 360 * 5 + requiredRotation; //to add prolonged spin to increase ui feel
    spinWheel.style.transform = `rotate(${currentRotation}deg)`;

    //remove the previous won reward modal
    const prevWin = winnings.querySelector('.modal__reward-won');
    const prevWinText = winnings.querySelector('.modal__you-won-text');
    if (prevWin) {
        prevWin.remove();
        prevWinText.remove();
    }

    //initialize default 7 days expire time to null deals
    let validity = winReward.validFor;
    if (!validity) {
        validity = 7;
    }

    //timeout to display won deal after wheel finishes rotation
    setTimeout(() => {
        const clone = template.content.cloneNode(true);
        setTemplate(clone, winReward, validity);
        winnings.append(clone);
        spinBtn.removeAttribute('disabled');
    }, 2500);

    //adding the reward won to permanent user data
    userData[winReward.promoCode] = {
        label: winReward.label,
        promoCode: winReward.promoCode,
        expiryAt: Date.now() + 24 * 60 * 60 * 1000 * validity,
    };
    localStorage.setItem('localUserData', JSON.stringify(userData)); //maintaining permanent user data: replacement of db
    dealCount.textContent = parseInt(dealCount.textContent) + 1; //update deal count instantaneously

    //adding data to deals block instantaneously

    userDataArray = Object.values(userData);
    userDataArray.sort((a, b) => a.expiryAt - b.expiryAt);
    userDataArray.forEach((deal) => {
        addToDeals(userData[deal.promoCode].expiryAt, deal);
    });

    //readd non won deals back to total available pool of deals
    Object.values(selectedRewards).forEach((reward) => {
        if (reward.promoCode !== winReward.promoCode) {
            availableRewards[reward.promoCode] = reward;
        }
    });
    validFlag = false;
});

//copy text to clipboard
winnings.addEventListener('click', (e) => {
    const codeCopyText = document.querySelector('.modal__code-copied');
    promoCopy(codeCopyText, e);
});

deals.addEventListener('click', (e) => {
    const dealContainer = e.target.closest('.modal__reward-won');
    const copyContainer = dealContainer.querySelector('.modal__code-copied');
    promoCopy(copyContainer, e);
});
