const profile = document.querySelector(`.profile__image`);
const online = document.querySelector(`.online__status`);
const mode = document.querySelector(`.color__mod`);
const language = document.querySelector(`.language`);
const languageBack = document.querySelector(`.languages__top`);
const languages = document.querySelector(`.languages`);
const menu = document.querySelector(`.profile__menu`);
const authMenu = document.querySelector(`.authorize__menu`);
const tabs = document.querySelectorAll(`.tab`);
const authButtons = document.querySelectorAll(`.js-showAuthMenu`);
const { body } = document;

const modal = new Modal(`auth`, {
    background: true,
    closeOnBg: true,
    showDuration: `0`
});

body.addEventListener(`click`, ({ target }) => {
    if (!target.closest(`.dropdown`) && !target.closest(`.profile`)) {
        document.querySelectorAll(`.dropdown`).forEach((element) => element.classList.add(`hidden`))
    }
})

if (profile) {
    profile.addEventListener(`click`, () => {
        menu.classList.toggle(`hidden`);
    })
    online.addEventListener(`click`, () => {
        document.querySelector(`.menu__user`).classList.toggle(`online`);
        document.querySelector(`.profile`).classList.toggle(`online`);
        document.getElementById(`online`).classList.toggle(`active`);
    })

    mode.addEventListener(`click`, () => {
        document.getElementById(`mode`).classList.toggle(`active`);
    })

    language.addEventListener(`click`, () => {
        const languageMenu = document.querySelector(`.language__menu`);
        languageMenu.classList.remove(`hidden`);
        menu.classList.add(`hidden`);
    })

    languageBack.addEventListener(`click`, () => {
        const languageMenu = document.querySelector(`.language__menu`);
        languageMenu.classList.add(`hidden`);
        menu.classList.remove(`hidden`);
    })

    languages.addEventListener(`click`, ({ target }) => {
        const language = target.closest(`label`)
        document.querySelectorAll(`.languages label`).forEach((element) => element.classList.remove(`active`))
        language.classList.add(`active`)
    })
}

function clearTabs () {
    tabs.forEach((element) => element.classList.remove(`active`))
    document.querySelectorAll(`[data-tab-id]`).forEach((element) => element.classList.add(`hidden`))
}

tabs.forEach(element => {
    element.addEventListener(`click`, ({ target }) => {
        clearTabs();
        document.querySelector(`#${target.id}`).classList.add(`active`)
        document.querySelector(`[data-tab-id=${target.id}]`).classList.remove(`hidden`)
    })
});

authButtons.forEach(element => {
    element.addEventListener(`click`, ({ target }) => {   
        clearTabs();
        modal.show();
        document.querySelector(`.authorize__menu`).classList.remove(`hidden`)
        document.querySelector(`#auth${target.id}`).classList.add(`active`)
        document.querySelector(`[data-tab-id=auth${target.id}]`).classList.remove(`hidden`)
    })
})

function getInfo() {
    fetch(`http://localhost:3000/books`)
        .then(res => console.log(res.json()))
}