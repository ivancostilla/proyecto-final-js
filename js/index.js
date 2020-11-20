const hamburger = document.querySelector(".navbar__hamburger");
const navLinks = document.querySelector(".navbar");

/* menu responsive */
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('nav').addClass('red');
        $('nav a').addClass('color-grey');
        $('navbar__links').addClass('color-grey');
        $('nav ul li a').addClass('color-grey');

    } else {
        $('nav').removeClass('red');
        $('nav a').removeClass('color-grey');
        $('nav div div').removeClass('color-grey');
        $('nav ul li a').removeClass('color-grey');
    };
});