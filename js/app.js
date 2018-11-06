const page = new Page();
let scanner;

let pageCollection = {
    scan: new Scan(),
    summary: new Summary(),
    event: new Event()
};

$(function() {
    load('summary');

    $('.nav-link').click(function () {
        let view = $(this).data('view');
        load(view);
    });
});

function load(view) {
    page.load(view);
    pageCollection[view].setListener();
}
