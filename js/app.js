const page = new Page();
let scanner;

$(function() {
    page.load('summary');

    $('.nav-link').click(function () {
        let view = $(this).data('view');
        page.load(view);
    });
});
