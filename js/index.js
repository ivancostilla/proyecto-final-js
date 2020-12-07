const hamburger = document.querySelector(".navbar__hamburger");
const navLinks = document.querySelector(".navbar");
const imgPopup = document.querySelectorAll(".galeria__img");
const ventanaModal = document.querySelector(".contenedor-modal__circle");


/* menu responsive hamburguesa */
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

/* funcion para que al hacer scroll el navbar tenga color */
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

/* funcion para asignar la clase popup
 a distintas variables con distintos elementos html */
/* esta funcion la creo xq quiero darle l mismo stilo poup a la galeria de img
y a las img de las cards */
const asignarPopup = (elem) => {
        (elem).forEach(popup => {
            popup.addEventListener('click', () => {
                popup.classList.toggle('popup');
            });
        });
    }
    /* galeria popup */
asignarPopup(imgPopup);

/* img de portada dinamica, que cambia cada 4 segundos */
function cambiarBg() {
    /* si solo pongo la url, no me toma la propiedad bg attchment en css, por eso coloco todo */
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
setInterval(cambiarBg, 4000);

/* Creando cards dinamicamente: */
/* 1- funcion para agregar la info a las cards dinamicamente */
function cardsInfo(img, nombre, descripcion, id) {
    this.img = `img/${img}.webp`;
    this.nombre = nombre;
    this.descripcion = descripcion;
    /* genero precios random: */
    let precio = Math.round(Math.random() * 700 + 100);
    this.precio = `$${precio}`;
    /* asigno id random por ahora, para pruebas, esas id van a servir para agrgar el producto al carrito */
    this.id = `${id}`;
};
/* 2- creamos el contenido de las cards: */
const papasFritas = new cardsInfo("papas", "Papas Fritas", "Papas fritas con salsa especial de la casa.", "7");
const nachos = new cardsInfo("nachos", "Nachos", "Nachos con salsa acida, barbacoa, cheddar y verdeo.", "8");
const chocloFrito = new cardsInfo("choclo", "Choclo Frito", "Choclo frito con salsa especial de la casa.", "9");
const burga1 = new cardsInfo("burger1", "Burga Doble", "Burga con medallón doble, panceta y cheddar.", "1");
const burga2 = new cardsInfo("burger2", "La Criolla", "Burga con cebolla caramelizada, queso criollo y lechuga.", "2");
const burga3 = new cardsInfo("burger3", "La Completa", "burga con ensalada, aros e cebolla y papas fritas.", "3");
const burga4 = new cardsInfo("burger4", "La Clásica", "burga con tomate, lechuga y cheddar.", "4");
const burga5 = new cardsInfo("burger5", "A Caballo", "burga con tomate, lechuga y huevo frito.", "5");
const burga6 = new cardsInfo("burger6", "La Burga", "burga con salsa especial de la casa, panceta, tomate, lechuga y cheddar.", "6");


/* 3- guardamos el contenido de cada card en un array */
let cardsBurgasArray = [burga1, burga2, burga3, burga4, burga5, burga6];
let cardsExtrasArray = [papasFritas, nachos, chocloFrito];

/* 4- guardamos en otro array los array anteriores por si tenemos mas secciones html
que contengan cards: */
let cardsContainer = [cardsBurgasArray, cardsExtrasArray];

/* 5- guardamos en variables los contenedores html padre de las cards: */
const cardBurgas = document.querySelector(".card__container-burgas");
const cardExtras = document.querySelector(".card__container-extras");

// 6- Creo un arreglo de los contenedores padres para asociar con las cards,
const containers = [cardBurgas, cardExtras];

/* 7- creamos dinamicamente las cards: */
for (i = 0; i < cardsContainer.length; i++) {
    let htmlCode = "";
    for (cards in cardsContainer[i]) {
        let card = cardsContainer[i][cards];
        let img = card["img"];
        let nombre = card["nombre"];
        let descripcion = card["descripcion"];
        let precio = card["precio"];
        let id = card["id"];
        htmlCode += `
                <div class="card">
                    <img class="card__img" src="${img}" alt="">
                    <h3 class="card__h3">${nombre}</h3>
                    <p class="card__content">${descripcion}<span class="card__precio">${precio}</span></p>
                    <button class="card__button" id="${id}">Agregar al carrito</button>
                </div>
`;
    };
    //8- Se asignan las cards on istinta info.. a los distintos contnedores.
    containers[i].innerHTML = htmlCode;
}

/* agregando la clase popup a las img de las cards, 
 la coloco aqui xq tengo que invocar la funcion despues de haber
 creado las cards dinamicamente con js */
const imgCard = document.querySelectorAll(".card__img");
/* si pongo la variable arriba de todo, no me toma el evento */
asignarPopup(imgCard);

/* carrousel e la sccion burgas:(usano una libreria) */
$(".owl-carousel").owlCarousel({
    loop: false,
    center: false,
    rewind: true,
    mergeFit: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        800: {
            items: 2,
            nav: false
        },
        1000: {
            items: 3,
            nav: false
        }
    }

})

/* ventana modal: */
ventanaModal.addEventListener("click", () => {
    ventanaModal.classList.toggle('contenedor-modal__open');
    ventanaModal.classList.toggle('contenedor-modal__close');
});