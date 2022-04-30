class TopBar {
    constructor() {
        this.profile = document.querySelector(`.profile__image`);
        this.online = document.querySelector(`.online__status`);
        this.mode = document.querySelector(`.color__mod`);
        this.language = document.querySelector(`.language`);
        this.languageBack = document.querySelector(`.languages__top`);
        this.languages = document.querySelector(`.languages`);
        this.menu = document.querySelector(`.profile__menu`);
        this.authMenu = document.querySelector(`.authorize__menu`);
        this.tabs = document.querySelectorAll(`.tab`);
        this.authButtons = document.querySelectorAll(`.js-showAuthMenu`);
        this.body = document.body;
        this.init();
    }

    dropdownMenu() {
        this.body.addEventListener(`click`, ({ target }) => {
            if (!target.closest(`.dropdown`) && !target.closest(`.profile`)) {
                document.querySelectorAll(`.dropdown`).forEach((element) => element.classList.add(`hidden`))
            }
        });
    }

    profileMenu() {
        if (this.profile) {
            this.profile.addEventListener(`click`, () => {
                this.menu.classList.toggle(`hidden`);
            })
            this.online.addEventListener(`click`, () => {
                document.querySelector(`.menu__user`).classList.toggle(`online`);
                document.querySelector(`.profile`).classList.toggle(`online`);
                document.getElementById(`online`).classList.toggle(`active`);
            })

            this.mode.addEventListener(`click`, () => {
                document.getElementById(`mode`).classList.toggle(`active`);
            })

            this.language.addEventListener(`click`, () => {
                const languageMenu = document.querySelector(`.language__menu`);
                languageMenu.classList.remove(`hidden`);
                this.menu.classList.add(`hidden`);
            })

            this.languageBack.addEventListener(`click`, () => {
                const languageMenu = document.querySelector(`.language__menu`);
                languageMenu.classList.add(`hidden`);
                this.menu.classList.remove(`hidden`);
            })

            this.languages.addEventListener(`click`, ({ target }) => {
                const language = target.closest(`label`)
                document.querySelectorAll(`.languages label`).forEach((element) => element.classList.remove(`active`))
                language.classList.add(`active`)
            })
        }
    }

    clearTabs() {
        this.tabs.forEach((element) => element.classList.remove(`active`))
        document.querySelectorAll(`[data-tab-id]`).forEach((element) => element.classList.add(`hidden`))
    }

    tabsFunc() {
        this.tabs.forEach(element => {
            element.addEventListener(`click`, ({ target }) => {
                this.clearTabs();
                document.querySelector(`#${target.id}`).classList.add(`active`)
                document.querySelector(`[data-tab-id=${target.id}]`).classList.remove(`hidden`)
            })
        });
    }

    modalMenu() {
        const modal = new Modal(`auth`, {
            background: true,
            closeOnBg: true,
            showDuration: `0`
        });

        this.authButtons.forEach(element => {
            element.addEventListener(`click`, ({ target }) => {
                this.clearTabs();
                modal.show();
                document.querySelector(`.authorize__menu`).classList.remove(`hidden`)
                document.querySelector(`#auth${target.id}`).classList.add(`active`)
                document.querySelector(`[data-tab-id=auth${target.id}]`).classList.remove(`hidden`)
            })
        })
    }

    init() {
        this.dropdownMenu();
        this.profileMenu();
        this.clearTabs();
        this.tabsFunc();
        this.modalMenu();
    }
}