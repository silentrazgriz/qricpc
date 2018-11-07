const page = new Page();
const api = new Api();
let scanner;
let data = {
    roles: [],
    events: []
};

let pageCollection = {
    scan: new Scan(),
    summary: new Summary(),
    event: new Event()
};

$(function() {
    syncData(() => {
        load('event');
    });

    $('.nav-link').click(function () {
        let view = $(this).data('view');
        load(view);
    });
});

async function syncData(callback) {
    api.getAllRoles(() => {
        api.getAllEvents(() => {
            callback();
        });
    });
}

function load(view) {
    page.load(view, pageCollection[view]);
}
