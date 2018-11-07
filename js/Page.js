class Page {
    constructor() {
        this.app = null;
    }

    setup() {
        this.app = $('#app');
    }

    load(view, page) {
        fetch(`views/${view}.html`)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                $('#app').html(html);
                $('.nav-item').removeClass('active');
                $(`#${view}`).addClass('active');

                page.setListener();
            });
    }
}