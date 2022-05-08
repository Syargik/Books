// eslint-disable-next-line no-unused-vars
class Modal {
    constructor(name, options) {
        this.name = name;
        this.option = options;
        this.modal = document.querySelector(`[data-modal-name=${this.name}]`);
        this.item = document.querySelector('.modal__item');
        this.modal.style.transition = `opacity ${this.option.showDuration}s ease`;

        if (this.option.background === true) {
            this.menu = document.createElement('div');
            this.menu.classList.add('modal__menu');

            if (this.option.closeOnBg === true) {
                this.modal.addEventListener('click', (event) => {
                    if (event.target.getAttribute('data-modal-name')) {
                        this.hide();
                    }
                });
            }
        }
        Modal.MODALS.push(this);
    }

    static hideAll() {
        Modal.MODALS.forEach((item) => {
            item.hide();
        });
    }

    static MODALS = [];

    show() {
        Modal.hideAll();
        this.modal.classList.add('visible');
        document.body.classList.add('scrollLock');

        if (this.option.background === true) {
            document.body.appendChild(this.menu);
        }
    }

    hide() {
        this.modal.classList.remove('visible');
        this.item.classList.add('hidden');
        document.body.classList.remove('scrollLock');
        if (this.option.background === true) {
            this.menu.remove();
        }
    }
}
