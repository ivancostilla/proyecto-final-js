const hamburger = document.querySelector(".navbar__hamburger");
const navLinks = document.querySelector(".navbar");
const imgPopup = document.querySelectorAll(".galeria__img");
const links = navLinks.querySelectorAll(".link");

/* menu responsive hamburguesa */

/* codigo para que al hacer click en un link el navbar se cierre */
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});
/* al hacer click en el icono hamburguesa el menu se abre o se cierra */
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
};
/* galeria popup */
asignarPopup(imgPopup);

/* img de portada dinamica, que cambia cada 4 segundos */
function cambiarBg() {
    /* si solo pongo la url, no me toma la propiedad bg attchment en css, por eso coloco todo */
    const images = [` url(../img/hero1.webp) no-repeat 50% 100% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero2.webp) no-repeat 50% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero3.webp) no-repeat 50% 100% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero4.webp) no-repeat 50% 75% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`,
        ` url(../img/hero5.webp) no-repeat 50% 100% / cover fixed, linear-gradient(120deg, hsla(337, 69%, 55%, .4) 0%, hsla(0, 88%, 47%, .4) 100%)`
    ]
    const head = document.querySelector(".head__img-hero");
    const bg = images[Math.floor(Math.random() * images.length)];
    head.style.background = bg;
};
setInterval(cambiarBg, 4000);

/* Creando cards dinamicamente: */
/* 1- funcion para agregar la info a las cards dinamicamente */
function cardsInfo(img, nombre, descripcion, precio, id) {
    this.img = `img/${img}.webp`;
    this.nombre = nombre;
    this.descripcion = descripcion;
    /* genero precios random: */
    this.precio = precio;
    /* asigno id random por ahora, para pruebas, esas id van a servir para agrgar el producto al carrito */
    this.id = `${id}`;
};
/* 2- creamos el contenido de las cards: */
const papasFritas = new cardsInfo("papas", "Papas Fritas", "Papas fritas con salsa especial de la casa.", "250", "7");
const nachos = new cardsInfo("nachos", "Nachos", "Nachos con salsa acida, barbacoa, cheddar y verdeo.", "280", "8");
const chocloFrito = new cardsInfo("choclo", "Choclo Frito", "Choclo frito con salsa especial de la casa.", "260", "9");
const burga1 = new cardsInfo("burger1", "La Doble", "Burga con medallón doble, panceta y cheddar.", "400", "1");
const burga2 = new cardsInfo("burger2", "La Criolla", "Burga con cebolla caramelizada, queso criollo y lechuga.", "350", "2");
const burga3 = new cardsInfo("burger3", "La Completa", "burga con ensalada, aros e cebolla y papas fritas.", "450", "3");
const burga4 = new cardsInfo("burger4", "La Clásica", "burga con tomate, lechuga y cheddar.", "300", "4");
const burga5 = new cardsInfo("burger5", "A Caballo", "burga con tomate, lechuga y huevo frito.", "350", "5");
const burga6 = new cardsInfo("burger6", "La Burga", "burga con salsa especial de la casa, panceta, tomate, lechuga y cheddar.", "400", "6");


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
                <div class="card carritoItem">
                    <img class="card__img imgItem" src="${img}" alt="comida rapida" loading="lazy">
                    <h3 class="card__h3 tituloItem">${nombre}</h3>
                    <p class="card__content">${descripcion}<span class="card__precio precioItem">$${precio}</span></p>
                    <button class="card__button agregarAlCarrito" id="${id}">Agregar al carrito</button>
                </div>`;
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

/* carrousel de la seccion burgas:(usando una libreria) */
$(".owl-carousel").owlCarousel({
    loop: false,
    center: false,
    rewind: true,
    mergeFit: false,
    autoplay: true,
    autoplayTimeout: 10000,
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

/* efecto botones al hacer click: */
const boton = document.querySelectorAll(".botones");
const botonCards = document.querySelectorAll(".card__button");
const botonPromo = document.querySelectorAll(".promo__button");

const botonEffect = (bton) => {
    bton.forEach(btn => {
        btn.addEventListener("click", function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ondas = document.createElement("span");
            ondas.style.left = x + "px";
            ondas.style.top = y + "px";
            this.appendChild(ondas);

            setTimeout(() => {
                ondas.remove()
            }, 900);
        });
    });
};
botonEffect(boton);
botonEffect(botonCards);
botonEffect(botonPromo);

/* ventana modal: */
const ventanaModal = document.querySelector(".contenedor-modal__circle");
const cerrarModal = document.querySelector(".contenedor-modal__cerrar-modal");

cerrarModal.addEventListener("click", () => {
    ventanaModal.classList.toggle('contenedor-modal__open');
    ventanaModal.classList.toggle('contenedor-modal__close');
});



/* temporizador de la seccion promos */
const obtenerTiempoFaltante = tiempofaltante => {
    let ahora = new Date();
    let tiempoParaFechaLimite = (new Date(tiempofaltante) - ahora + 1000) / 1000;
    /* el slice-2 es para que si el contador tiene 1 solo digito, agrege el 0 que puse adelante
    si tiene 2 digitos, ignora el 0 */
    /* % de 60 es xq son 60 segundos */
    let segundosfaltantes = (`0` + Math.floor(tiempoParaFechaLimite % 60)).slice(-2);
    /* /60 & 60 es porque son 60 minutos por hora de 60 segundos c/u */
    let minutosfaltantes = (`0` + Math.floor(tiempoParaFechaLimite / 60 % 60)).slice(-2);
    /* 3600 son los segundos que tiene el dia %24.. xq el dia tiene 24hs */
    let horasfaltantes = (`0` + Math.floor(tiempoParaFechaLimite / 3600 % 24)).slice(-2);
    /* acá no hay slice xq no hace falta  ponerle un 0 adelante a los dias.. se pone * 24.. xq l dia tien 24hs */
    let diasfaltantes = Math.floor(tiempoParaFechaLimite / (3600 * 24));

    return {
        tiempoParaFechaLimite,
        segundosfaltantes,
        minutosfaltantes,
        horasfaltantes,
        diasfaltantes
    };

};

const contador = (tiempofaltante, dias, horas, minutos, segundos) => {
    const dia = document.querySelector(dias);
    const hora = document.querySelector(horas);
    const minuto = document.querySelector(minutos);
    const segundo = document.querySelector(segundos);
    const timerUpdate = setInterval(() => {
        let t = obtenerTiempoFaltante(tiempofaltante);
        dia.innerHTML = `${t.diasfaltantes}`;
        hora.innerHTML = `${t.horasfaltantes}`;
        minuto.innerHTML = `${t.minutosfaltantes}`;
        segundo.innerHTML = `${t.segundosfaltantes}`;
        if (t.tiempoParaFechaLimite <= 1) {
            clearInterval(timerUpdate);
        }
    }, 1000);
};

contador("Tue Dec 10 2020 01:12:00 GMT-0300", ".dia", ".hora", ".minuto", ".segundo");
contador("Tue Dec 29 2020 23:14:38 GMT-0300", ".dia1", ".hora1", ".minuto1", ".segundo1");
contador("Tue Dec 19 2020 17:14:56 GMT-0300", ".dia2", ".hora2", ".minuto2", ".segundo2");

/* console.log(burga6)

let burga6json = JSON.stringify(burga6);
console.log(burga6json) */

/* carrito de compras: */

/* boton para agregar al carrito: */
const agregarAlCarrito = document.querySelectorAll(".agregarAlCarrito");

/* div contenedor de los productos agregados al carrito: */
const contenedorProductos = document.querySelector(".carrito__productos-container");

/* boton comprar: */
const botonComprar = document.getElementById("comprar");
const btncomprarClickeado = () => {

    if (contenedorProductos.innerHTML == "") {
        Command: toastr["error"]("intenta agregar algún producto", "El carrito está vacío")

            toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    else {
        Command: toastr["success"]("recibirás tu pedido pronto", "Gracias por tu compra")

            toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        contenedorProductos.innerHTML = "";
    };
    actualizarTotalDelCarrito();
};
botonComprar.addEventListener("click", btncomprarClickeado);
/* al hacer click en el boton de la card capturamos todos los elementos de la card */
const agregarAlCarritoClikeado = (e) => {
    /* escuchamos el evento click del boton */
    const btn = e.target;
    /* y con closest.. agarramos el elemento mas cercano que contenga la clase carritoitem.. en este 
    caso seleccionamos toda la card: */
    const carritoItem = btn.closest(".carritoItem");
    /* obtenmos l texto del h3 la card: */
    const tituloItem = carritoItem.querySelector(".tituloItem").textContent;
    /* obtenmos el precio: */
    const precioItem = carritoItem.querySelector(".precioItem").textContent;
    /* obtenemos la imagen: */
    const imgItem = carritoItem.querySelector(".imgItem").src;

    agregarCardAlCarrito(imgItem, tituloItem, precioItem);

}
const agregarCardAlCarrito = (imgItem, tituloItem, precioItem) => {

    /* hacemos que no se repitan los productos y que si se repiten, se sume al value del input: */
    const tituloDelProducto = contenedorProductos.querySelectorAll(".producto-contenido__titulo");
    for (let i = 0; i < tituloDelProducto.length; i++) {
        /* si los titulos de los productos son iguales: */
        if (tituloDelProducto[i].innerText === tituloItem) {
            /* llamo a la clase que contiene el input */
            let cantidadDeProductos = tituloDelProducto[i].parentElement.parentElement.querySelector(".producto-cantidad__input");
            /* parseo el value xq si no no me lo cambia: y ademas le aumento el value en 1 */
            Number(cantidadDeProductos.value++)
                /* alert: */
            Command: toastr["success"]("Tu producto se agregó correctamente al carrito", "Producto agregado ")
            toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-bottom-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "swing",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                /* actualizo el valor total del carrito */
            actualizarTotalDelCarrito();
            /* con el return hago que no se repita el producto en el carrito */
            return;
        }
    }
    const contenidosProductosDelCarrito = `
    <div class="carrito__producto">
        <div class="producto-contenido carrito__producto-item">
            <img class="producto-contenido__img" src="${imgItem}" alt="">
            <h6 class="producto-contenido__titulo">${tituloItem}</h6>
        </div>
        <div class="producto-precio carrito__producto-item">
            <p>${precioItem}</p>
        </div>
        <div class="producto-cantidad carrito__producto-item">
            <input class="producto-cantidad__input" type="number" value="1">
            <button class="botones producto-cantidad__button">X</button>
        </div>
    </div>`;
    contenedorProductos.innerHTML += contenidosProductosDelCarrito;

    /* eliminar productos en el carrito */
    const eliminarProducto = contenedorProductos.querySelectorAll(".producto-cantidad__button");
    eliminarProducto.forEach(botonEliminar => {
        botonEliminar.addEventListener("click", removerItemDelCarrito);
    });
    /* actualizar cantidad en  el input de cada producto: */
    const cantidadDelProducto = contenedorProductos.querySelectorAll(".producto-cantidad__input");
    cantidadDelProducto.forEach(cantidad => {
        cantidad.addEventListener("change", cantidadCambiada);
    });
    actualizarTotalDelCarrito();
};

/* funion para saber el $ total del carrito: */
const actualizarTotalDelCarrito = () => {
    let total = 0;
    /* este es el P que muestra el total: */
    const totalDelCarrito = document.querySelector(".carrito__total");

    /* aca slccionamos el precio de cada producto que se agrega al carrito */
    const itemsDelCarrito = document.querySelectorAll(".carrito__producto");

    /* recorremos  toos los productos dentro del carrito: */
    itemsDelCarrito.forEach(itemsDelCarrito => {
        /* obtenemos el precio del producto, parseado a numero, y eliminando el signo $: */
        const precioDelProductoEnElCarrito = Number(itemsDelCarrito.querySelector(".producto-precio").textContent.replace("$", ""));

        /* acá seleccionamos la canidad de productos en el carrito */
        const cantidadDeItems = Number(itemsDelCarrito.querySelector(".producto-cantidad__input").value);

        /* y el total lo sumamos al precio de productos por la cantidad de losmismos: */
        total = total + precioDelProductoEnElCarrito * cantidadDeItems;
    });

    /* guardamos el total en el P, el toFixed es para que el precio muestre hasta 2 decimales */
    totalDelCarrito.innerHTML = ` $${total.toFixed(2)}`;
};

/* funcion para eliminar productos del carrito: */
const removerItemDelCarrito = (e) => {
    /* obtenemos el evento al hacer click en el boton: */
    const botonEliminarClikeado = e.target;
    /* y eliminamos la clase mas cercana al boton eliminar Producto:
    en este caso elegimos la clase que contiene a todo el producto en el carrito*/
    botonEliminarClikeado.closest(".carrito__producto").remove();
    /* llamo a esta funcion para que el total se actualize en tiempo real al
    eliminar algun producto: */
    actualizarTotalDelCarrito();
};

const cantidadCambiada = (e) => {
    const input = e.target;
    /* para que el input no tnga negativos */
    input.value <= 0 ? (input.value = 1) : null;
    /* actualizamos el precio al cambiar la cantidad: */
    actualizarTotalDelCarrito();
};
/* recorremos todos los elementos que tienen la clase agregar al carrito y ejecutamos la funcion */
agregarAlCarrito.forEach(botonAgregarAlCarrito => {
    botonAgregarAlCarrito.addEventListener("click", agregarAlCarritoClikeado);

});