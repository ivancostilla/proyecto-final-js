const hamburger = document.querySelector(".navbar__hamburger");
const navLinks = document.querySelector(".navbar");
const imgPopup = document.querySelectorAll('.galeria__img');
/* menu responsive hamburguesa */
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

/* fincion para que al hacer scroll el navbar tenga color */
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

/* galeria popup */
imgPopup.forEach(popup => {
    popup.addEventListener('click', () => {
        popup.classList.toggle('popup');
    });
});