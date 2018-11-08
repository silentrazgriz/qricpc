const page = new Page();
const api = new Api();
let scanner, cur = undefined;
let data = {
    roles: [],
    events: [],
    participants: []
};

let pageCollection = {
    scan: new Scan(),
    summary: new Summary(),
    event: new Event()
};

$(function() {
    syncData(() => {
        load('summary');
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
    if (cur != undefined) {
        pageCollection[cur].reset();
    }
    page.load(view, pageCollection[view]);
    cur = view;
}
