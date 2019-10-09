const formUrl = "https://forms.gle/6ZFMei7CXUAfVXpZ8";

document.querySelector('#btn-register-now').onclick = () => {
    window.open(formUrl, '_blank');
};

$("#chevron").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#start").offset().top
    }, 2000);
});