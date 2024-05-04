let isDOBOpen = false;
let dateOfBirth;

const settingsCogEl = document.getElementById("settingsIcon");
const settingsContentEl = document.getElementById("settingsContent");

const initialTextEl = document.getElementById("initialText");
const afterDOBButtonEl = document.getElementById("afterDOBButton");
const dobButtonEl = document.getElementById("dobButton")
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minEl = document.getElementById("minute");
const secEl = document.getElementById("second");

const makeTwoDigit = (number) => {
    return number > 9 ? number :  `0${number}`;
}

const toggleDateOfBirthSelector = () => {
    if(isDOBOpen){
        settingsContentEl.classList.add("hide");
    }
    else{
        settingsContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
    console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
    const currentDate = new Date();
    //console.log({currentDate});
    const dateDiff = currentDate - dateOfBirth;
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365) % 12);
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
    const hour = Math.floor(dateDiff / (1000 * 60 * 60) % 24);
    const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
    const second = Math.floor(dateDiff / 1000) % 60;

    yearEl.innerHTML = makeTwoDigit(year);
    monthEl.innerHTML = makeTwoDigit(month);
    dayEl.innerHTML = makeTwoDigit(day);
    hourEl.innerHTML = makeTwoDigit(hour);
    minEl.innerHTML = makeTwoDigit(minute);
    secEl.innerHTML = makeTwoDigit(second);
};

const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;
    

    if(dateOfBirth){
        initialTextEl.classList.add("hide");
        afterDOBButtonEl.classList.remove("hide");
        setInterval(() => updateAge(), 1000);
    }
    else{
        afterDOBButtonEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};

setDOBHandler();

settingsCogEl.addEventListener("click", toggleDateOfBirthSelector)
dobButtonEl.addEventListener("click",setDOBHandler);