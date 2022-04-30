class TopBar {
    constructor() {
        this.elements = {}
        this.init();
    }

    dropdownMenu(target) {
        if (!target.closest(`.dropdown`) && !target.closest(`.profile`)) {
            document.querySelectorAll(`.dropdown`).forEach((element) => element.classList.add(`hidden`))
        }
    }

    showProfileMenu() {
        this.elements.menu.classList.toggle(`hidden`);
    }

    onlineChanging() {
        document.querySelector(`.menu__user`).classList.toggle(`online`);
        document.querySelector(`.profile`).classList.toggle(`online`);
        document.getElementById(`online`).classList.toggle(`active`);
    }

    modeChanging() {
        document.getElementById(`mode`).classList.toggle(`active`);
    }

    showLanguageMenu() {
        this.elements.languageMenu.classList.remove(`hidden`);
        this.elements.menu.classList.add(`hidden`);
    }

    backLanguageMenu() {
        this.elements.languageMenu.classList.add(`hidden`);
        this.elements.menu.classList.remove(`hidden`);
    }

    languageChoose(target) {
        const language = target.closest(`label`)
        document.querySelectorAll(`.languages label`).forEach((element) => element.classList.remove(`active`))
        language.classList.add(`active`)
    }

    tabsFunc(target) {
        this.clearTabs();
        document.querySelector(`#${target.id}`).classList.add(`active`)
        document.querySelector(`[data-tab-id=${target.id}]`).classList.remove(`hidden`)
    }

    unAuthorizedButtons(target) {
        this.clearTabs();
        this.elements.modal.show();
        document.querySelector(`.authorize__menu`).classList.remove(`hidden`)
        document.querySelector(`#auth${target.id}`).classList.add(`active`)
        document.querySelector(`[data-tab-id=auth${target.id}]`).classList.remove(`hidden`)
    }

    clearTabs() {
        this.elements.tabs.forEach((element) => element.classList.remove(`active`))
        document.querySelectorAll(`[data-tab-id]`).forEach((element) => element.classList.add(`hidden`))
    }

    bindElements() {
        this.elements.profile = document.querySelector(`.profile__image`);
        this.elements.online = document.querySelector(`.online__status`);
        this.elements.mode = document.querySelector(`.color__mod`);
        this.elements.language = document.querySelector(`.language`);
        this.elements.languageBack = document.querySelector(`.languages__top`);
        this.elements.languages = document.querySelector(`.languages`);
        this.elements.menu = document.querySelector(`.profile__menu`);
        this.elements.authMenu = document.querySelector(`.authorize__menu`);
        this.elements.tabs = document.querySelectorAll(`.tab`);
        this.elements.authButtons = document.querySelectorAll(`.js-showAuthMenu`);
        this.elements.body = document.body;
        this.elements.languageMenu = document.querySelector(`.language__menu`);
        this.elements.modal = new Modal(`auth`, {
            background: true,
            closeOnBg: true,
            showDuration: `0`
        });
    }

    bindHandlers() {
        this.elements.body.addEventListener(`click`, ({ target }) => {
            this.dropdownMenu(target);
        });

        if (this.elements.profile) {

            this.elements.profile.addEventListener(`click`, () => {
                this.showProfileMenu();
            })

            this.elements.online.addEventListener(`click`, () => {
                this.onlineChanging();
            })

            this.elements.mode.addEventListener(`click`, () => {
                this.modeChanging();
            })

            this.elements.language.addEventListener(`click`, () => {
                this.showLanguageMenu();
            })

            this.elements.languageBack.addEventListener(`click`, () => {
                this.backLanguageMenu();
            })

            this.elements.languages.addEventListener(`click`, ({ target }) => {
                this.languageChoose(target);
            })

        }

        this.elements.tabs.forEach(element => {
            element.addEventListener(`click`, ({ target }) => {
                this.tabsFunc(target);
            })
        });

        this.elements.authButtons.forEach(element => {
            element.addEventListener(`click`, ({ target }) => {
                this.unAuthorizedButtons(target);
            })
        })
    }

    init() {
        this.bindElements();
        this.bindHandlers();
        this.clearTabs();
    }
}

new TopBar()