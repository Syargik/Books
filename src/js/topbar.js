class TopBar {
    constructor() {
        this.elements = {};
        this.init();
    }

    static dropdownMenu(target) {
        if (!target.closest('.dropdown') && !target.closest('.profile')) {
            document.querySelectorAll('.dropdown').forEach((element) => element.classList.add('hidden'));
        }
    }

    showProfileMenu() {
        this.elements.menu.classList.toggle('hidden');
    }

    onlineChanging() {
        this.elements.userMenu.classList.toggle('online');
        this.elements.profileOnlineStatus.classList.toggle('online');
        this.elements.onlineStatus.classList.toggle('active');
    }

    modeChanging() {
        this.elements.modeSwitcher.classList.toggle('active');
    }

    showLanguageMenu() {
        this.elements.languageMenu.classList.remove('hidden');
        this.elements.menu.classList.add('hidden');
    }

    backLanguageMenu() {
        this.elements.languageMenu.classList.add('hidden');
        this.elements.menu.classList.remove('hidden');
    }

    languageChoose(target) {
        const language = target.closest('label');
        this.elements.languagesLabels.forEach((element) => element.classList.remove('active'));
        language.classList.add('active');
    }

    tabsFunc(target) {
        this.clearTabs();
        document.querySelector(`#${target.id}`).classList.add('active');
        document.querySelector(`[data-tab-id=${target.id}]`).classList.remove('hidden');
    }

    createModal() {
        // eslint-disable-next-line no-undef
        this.modal = new Modal('auth', {
            background: true,
            closeOnBg: true,
            showDuration: '0',
        });
    }

    unAuthorizedButtons(target) {
        this.clearTabs();
        this.modal.show();
        this.elements.authMenu.classList.remove('hidden');
        document.querySelector(`#auth${target.id}`).classList.add('active');
        document.querySelector(`[data-tab-id=auth${target.id}]`).classList.remove('hidden');
    }

    clearTabs() {
        this.elements.tabs.forEach((element) => element.classList.remove('active'));
        this.elements.dataTabs.forEach((element) => element.classList.add('hidden'));
    }

    bindElements() {
        this.elements.modeSwitcher = document.getElementById('mode');
        this.elements.mode = document.querySelector('.color__mod');
        this.elements.profile = document.querySelector('.profile__image');
        this.elements.menu = document.querySelector('.profile__menu');
        this.elements.userMenu = document.querySelector('.menu__user');
        this.elements.profileOnlineStatus = document.querySelector('.profile');
        this.elements.online = document.querySelector('.online__status');
        this.elements.onlineStatus = document.getElementById('online');
        this.elements.languageMenu = document.querySelector('.language__menu');
        this.elements.language = document.querySelector('.language');
        this.elements.languageBack = document.querySelector('.languages__top');
        this.elements.languages = document.querySelector('.languages');
        this.elements.languagesLabels = document.querySelectorAll('.languages label');
        this.elements.authMenu = document.querySelector('.authorize__menu');
        this.elements.tabs = document.querySelectorAll('.tab');
        this.elements.dataTabs = document.querySelectorAll('[data-tab-id]');
        this.elements.authButtons = document.querySelectorAll('.js-showAuthMenu');
        this.elements.body = document.body;
    }

    bindHandlers() {
        this.elements.body.addEventListener('click', ({ target }) => {
            this.dropdownMenu(target);
        });

        if (this.elements.profile) {
            this.elements.profile.addEventListener('click', () => {
                this.showProfileMenu();
            });

            this.elements.online.addEventListener('click', () => {
                this.onlineChanging();
            });

            this.elements.mode.addEventListener('click', () => {
                this.modeChanging();
            });

            this.elements.language.addEventListener('click', () => {
                this.showLanguageMenu();
            });

            this.elements.languageBack.addEventListener('click', () => {
                this.backLanguageMenu();
            });

            this.elements.languages.addEventListener('click', ({ target }) => {
                this.languageChoose(target);
            });
        }

        this.elements.tabs.forEach((element) => {
            element.addEventListener('click', ({ target }) => {
                this.tabsFunc(target);
            });
        });

        this.elements.authButtons.forEach((element) => {
            element.addEventListener('click', ({ target }) => {
                this.unAuthorizedButtons(target);
            });
        });
    }

    init() {
        this.bindElements();
        this.bindHandlers();
        this.createModal();
    }
}

new TopBar();
