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

function changeBg() {
    const images = [` url(../img/hero1.webp) no-repeat 75% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero2.webp) no-repeat 75% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero3.webp) no-repeat 75% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero4.webp) no-repeat 75% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero5.webp) no-repeat 75% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`
    ]
    const head = document.querySelector(".head__img-hero");
    const bg = images[Math.floor(Math.random() * images.length)];
    head.style.background = bg;
};
setInterval(changeBg, 4000);