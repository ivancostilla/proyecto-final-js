const hamburger = document.querySelector(".navbar__hamburger");
const navLinks = document.querySelector(".navbar");
const imgPopup = document.querySelectorAll(".galeria__img");
const links = navLinks.querySelectorAll(".link");
const promoPopup = document.querySelectorAll(".promo__img");

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
/* esta funcion la creo xq quiero darle el mismo estilo popup a la galeria de img
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
asignarPopup(promoPopup);

/* img de portada dinamica, que cambia cada 4 segundos */
function cambiarBg() {
    /* si solo pongo la url, no me toma la propiedad bg attchment en css, por eso coloco todo */
    const images = [` url(../img/hero1.webp) no-repeat 50% 100% / cover fixed`,
        ` url(../img/hero2.webp) no-repeat 50% 75% / cover fixed`,
        ` url(../img/hero3.webp) no-repeat 50% 100% / cover fixed`,
        ` url(../img/hero4.webp) no-repeat 50% 75% / cover fixed`,
        ` url(../img/hero5.webp) no-repeat 50% 100% / cover fixed`
    ]
    const head = document.querySelector(".head__img-hero");
    const bg = images[Math.floor(Math.random() * images.length)];
    head.style.background = bg;
};
setInterval(cambiarBg, 4000);

document.addEventListener('DOMContentLoaded', function() {
    $ajax = $.ajax({
        url: 'js/productos.json',
        success: function(data, status, xhr) {
            /* Creando cards dinamicamente: */
            /* 1- funcion para agregar la info a las cards dinamicamente */
            function cardsInfo(img, nombre, descripcion, precio, id) {
                this.img = `img/${img}.webp`;
                this.nombre = nombre;
                this.descripcion = descripcion;
                this.precio = precio;
                this.id = `${id}`;
            };
            /* 2- creamos el contenido de las cards: */

            const papasFritas = new cardsInfo(data[0].img, data[0].nombre, data[0].descripcion, data[0].precio, data[0].id);
            const nachos = new cardsInfo(data[1].img, data[1].nombre, data[1].descripcion, data[1].precio, data[1].id);
            const chocloFrito = new cardsInfo(data[2].img, data[2].nombre, data[2].descripcion, data[2].precio, data[2].id);
            const burga1 = new cardsInfo(data[3].img, data[3].nombre, data[3].descripcion, data[3].precio, data[3].id);
            const burga2 = new cardsInfo(data[4].img, data[4].nombre, data[4].descripcion, data[4].precio, data[4].id);
            const burga3 = new cardsInfo(data[5].img, data[5].nombre, data[5].descripcion, data[5].precio, data[5].id);
            const burga4 = new cardsInfo(data[6].img, data[6].nombre, data[6].descripcion, data[6].precio, data[6].id);
            const burga5 = new cardsInfo(data[7].img, data[7].nombre, data[7].descripcion, data[7].precio, data[7].id);
            const burga6 = new cardsInfo(data[8].img, data[8].nombre, data[8].descripcion, data[8].precio, data[8].id);

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
                //8- Se asignan las cards con distinta info.. a los distintos contenedores:
                containers[i].innerHTML = htmlCode;
            }

            /* agregando la clase popup a las img de las cards, 
             la coloco aqui xq tengo que invocar la funcion despues de haber
             creado las cards dinamicamente con js */
            const imgCard = document.querySelectorAll(".card__img");
            /* si pongo la variable arriba de todo, no me toma el evento xq stoy usano funion flecha */
            asignarPopup(imgCard);

            /* carrousel de la seccion burgas:(usando una libreria de jquery) */
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
            });

            /* efecto botones al hacer click: */
            const boton = document.querySelectorAll(".botones");
            const botonCards = document.querySelectorAll(".card__button");
            const botonPromo = document.querySelectorAll(".promo__button");
            const botnArmaTuCombo = document.querySelectorAll(".arma_button")

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
            botonEffect(botnArmaTuCombo);
            /* ventana modal: */
            const ventanaModal = document.querySelector(".contenedor-modal__circle");
            const cerrarModal = document.querySelectorAll(".cerrar-modal");
            cerrarModal.forEach(btn => {
                btn.addEventListener("click", () => {
                    ventanaModal.classList.toggle('contenedor-modal__open');
                    ventanaModal.classList.toggle('contenedor-modal__close');
                });
            });

            /* temporizador de la seccion promos: */
            /* paso como parametros primero: la clase html que muestra los minutos,
            segundo:  los minutos que quiero que tengan los timers,
            tercero: la clase html que muestra los segundos */
            function Temporizador(minutos, inicioMinutos, segundos) {
                this.minutos = minutos;
                this.segundos = segundos;
                /* este if es para que si agregan mas de 60 minutos, se muestre en el html solamente dos 0 */
                if (inicioMinutos > 59) {
                    this.inicioMinutos = 59
                } else {
                    this.inicioMinutos = Math.round(inicioMinutos); /* redondeo para evitar que coloquen decimales */
                }
                let inicioSegundos;
                if (inicioMinutos <= 0) {
                    inicioSegundos = 0;
                } else {
                    inicioSegundos = 59;
                }
                /* termino los segundos en -1 para que en el htnl se me muestre el 0, no se muestra el -1*/
                let finalSegundos = -1;
                let contadorSegundos = inicioSegundos;
                this.conteoSegundos = function() {
                    /* si el contadorsegundos llega a -1 entonces se reinicia, ya q contaorsgunos va a pasar a sr igual a iniciosegundos: */
                    if (contadorSegundos == finalSegundos) contadorSegundos = inicioSegundos;
                    /* y si el contadoseegunos es igual a 59 entoncees decremento el minutero en 1: */
                    if (contadorSegundos == 59) this.inicioMinutos--;
                    /* mientras el contadorsegundos sea menor a 10, agrego un 0 asi se mustran dos digitos en el html */
                    if (contadorSegundos < 10) {
                        document.querySelector(`.${this.segundos}`).innerHTML = `0${contadorSegundos--}`;
                    } else {
                        /* y si no s menor a 10, no agrgo un 0 */
                        document.querySelector(`.${this.segundos}`).innerHTML = contadorSegundos--;
                    };
                    /* lo mismo suede con los minutos, si s menor a 10 agrego un 0 y si no, no agrgo nada */
                    if (this.inicioMinutos < 10) {
                        document.querySelector(`.${this.minutos}`).innerHTML = `0${this.inicioMinutos}`;
                    } else {
                        document.querySelector(`.${this.minutos}`).innerHTML = this.inicioMinutos;
                    }
                    /* si iniciominutos tiene valor negativo, va a valer 0 */
                    if (this.inicioMinutos < 0) {
                        this.inicioMinutos = 0
                        document.querySelector(`.${this.minutos}`).innerHTML = this.inicioMinutos;
                    }
                    setTimeout(this.conteoSegundos.bind(this), 1000);
                };
            };

            /* instancio e inicializo el objeto: */
            let promoUno = new Temporizador("minuto", 5, 'segundo');
            promoUno.conteoSegundos();
            let promoDos = new Temporizador("minuto1", 70, 'segundo1');
            promoDos.conteoSegundos();
            let promoTres = new Temporizador("minuto2", 0, 'segundo2');
            promoTres.conteoSegundos();

            /* seccion armá tu combo: */

            /* nombre y precio de los ingrdientes para comparar con los options dentro de los select: */
            let cantidadMedallones = [
                ["1 medallón", 60],
                ["2 medallones", 120],
                ["3 medallones", 180],
                ["4 medallones", 240]
            ];
            let adicionalUno = [
                ["Sin adicional", 0],
                ["Cheddar", 20]
            ];
            let adicionalDos = [
                ["Sin adicional1", 0],
                ["Panceta", 20]
            ];
            let guarnicion = [
                ["Sin guarnicion", 0],
                ["Papas Fritas", 120],
                ["Choclo Frito", 130]
            ];
            let bebida = [
                ["Sin bebida", 0],
                ["Coca-Cola", 65],
                ["Fanta", 60],
                ["Sprite", 55],
                ["Cerveza", 80]
            ];

            /* guardo en variables las clases que contienen los select: */
            const selectBurga = document.querySelector(".select-burga");
            const selectAdicionalUno = document.querySelector(".select-adicional1");
            const selectAdicionalDos = document.querySelector(".select-adicional2");
            const selectGuarnicion = document.querySelector(".select-guarnicion");
            const selectBebida = document.querySelector(".select-bebida");

            /* inicialco los precios en 0 */
            let precioMedallon = 0;
            let precioAdicionalUno = 0;
            let precioAdicionalDos = 0;
            let precioGuarnicion = 0;
            let precioBebida = 0;

            /* guardo en la variable las clases que muestran el precio final: */
            const precioTotalDelCombo = document.querySelectorAll(".precioItem");
            /* funcion que suma los precios de cada input y los guarda en el innerText de la variable precioTotalDelCombo: */
            function sumaTotalCombo() {
                precioTotalDelCombo.forEach(precio => {
                    let totalDelCombo = precioMedallon + precioAdicionalUno + precioAdicionalDos + precioGuarnicion + precioBebida;
                    precio.innerText = `$${totalDelCombo}.00`;
                });
            };

            /* funciones para capturar la seleccion del usuario y sumar los precios: */
            function MedallonesElegido() {
                // Suma el precio parcial
                cantidadMedallones.forEach(value => {
                    if (value[0] == selectBurga.value) {
                        precioMedallon = value[1];
                        sumaTotalCombo();
                    };
                });
                return selectBurga.value;
            };

            function adicionalUnoElegido() {
                // Suma el precio parcial
                adicionalUno.forEach(value => {
                    if (value[0] === selectAdicionalUno.value) {
                        precioAdicionalUno = value[1];
                        sumaTotalCombo();
                    };
                });
                return selectAdicionalUno.value;
            };

            function adicionalDosElegido() {
                // Suma el precio parcial
                adicionalDos.forEach((value) => {
                    if (selectAdicionalDos.value == value[0]) {
                        precioAdicionalDos = value[1];
                        sumaTotalCombo();
                        return selectAdicionalDos.value;
                    };
                });
            };

            function guarnicionElegida() {
                // Suma el precio parcial
                guarnicion.forEach((value) => {
                    if (value[0] === selectGuarnicion.value) {
                        precioGuarnicion = value[1];
                        sumaTotalCombo();
                    }
                });
                return selectGuarnicion.value;
            };

            function bebidaElegida() {
                // Suma el precio parcial
                bebida.forEach((value) => {
                    if (value[0] === selectBebida.value) {
                        precioBebida = value[1];
                        sumaTotalCombo();
                    };
                });
                return selectBebida.value;
            };

            /* eventos q se ejecutan al cambiar el valor del select: */
            selectBurga.addEventListener("change", comboCompleto);
            selectAdicionalUno.addEventListener("change", comboCompleto);
            selectAdicionalDos.addEventListener("change", comboCompleto);
            selectGuarnicion.addEventListener("change", comboCompleto);
            selectBebida.addEventListener("change", comboCompleto);
            /* evento para prevenir la recarga de la ventana: */
            const botonCombo = document.querySelector(".arma_button");
            botonCombo.addEventListener("click", (e) => {
                e.preventDefault();
            });
            /* funcion para que se cree un nuevo producto DISTINTO dentro del modal del carrito
            cada vez que le doy al boton "agregar al carrito". asi, cada vez que cambie el precio del producto
            por los ingredientes elegidos por el usuario, nos crea un roducto distinto
            lo unico que hago acá es cambiar el id del boton cada vez que se hace click, y asi se crea un producto diferente */
            let idnueva = 100;

            function nuevaId() {
                idnueva = idnueva * 2;
                botonCombo.setAttribute('ID', `${idnueva}`);
            };
            botonCombo.addEventListener("click", nuevaId);

            /* cambiamos los precios y las imagenes */
            function comboCompleto() {
                ingredientesElegidos();
                /* falta cargar la funcion de las imagenes */
            };

            /* objeto para  ir guardando las elecciones del usuario */
            let comboElegido = {};

            /* funcion para guardar cada eleccion del usuario */
            function ingredientesElegidos() {
                comboElegido = {
                    "medallones": MedallonesElegido(),
                    "adicionalUno": adicionalUnoElegido(),
                    "adicionalDos": adicionalDosElegido(),
                    "guarnicion": guarnicionElegida(),
                    "bebida": bebidaElegida()
                };
            };

            /* carrito: */
            const carrito = document.querySelector('.carrito__productos-container'); /* contenedor de los productos en el modal */
            const agregarProductos = document.querySelectorAll('.agregarAlCarrito'); /* contnedor de cards */
            const botonComprar = document.getElementById("comprar"); /* boton comprar */
            let articulosCarrito = [];

            /* agrego prouctos al carrito al hacer click en los botons de las cards: */
            agregarProductos.forEach(productoagregado => {
                productoagregado.addEventListener('click', agregarProducto);
            });
            /* elimino un proucto en el carrito: */
            carrito.addEventListener('click', eliminarProducto);
            /* hago la compra de too lo q hay en el carrito: */
            botonComprar.addEventListener('click', hacerCompra);
            /* cargo productos que esten seleccionados con antrioridad en el carrito: */
            function load() {
                articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
                insertarCarritoHTML();
            };
            load();

            function hacerCompra() {
                /* alerts para indicarle al usuario que el carrito está vacío:
                o en el else.. indicarle que la compra fué exitosa: */
                if (carrito.innerHTML == "") {
                    Command: toastr["error"]("intenta agregar algún producto", "El carrito está vacío");
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
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
                    };
                }
                else {
                    Command: toastr["success"]("recibirás tu pedido pronto", "Gracias por tu compra");
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
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
                };

                articulosCarrito = [];
                borrarHTML();
                mostrarNotificacion()
                guardarStorage();

            };

            function agregarProducto(e) {
                if (e.target.classList.contains("agregarAlCarrito")) {
                    /* Selecciono el card del producto sobre el que se hizo click */
                    const productoSeleccionado = e.target.parentElement;
                    obtenerDatosProducto(productoSeleccionado);
                };
            };

            function eliminarProducto(e) {
                if (e.target.classList.contains('botonEliminar')) {
                    const productoId = e.target.getAttribute('id');
                    articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
                    insertarCarritoHTML();
                    guardarStorage();
                };
            };

            function obtenerDatosProducto(producto) {

                /* Extraemos informacion del producto seleccionado */
                const productoAgregado = {
                    imagen: producto.querySelector('.imgItem').src,
                    nombre: producto.querySelector('.tituloItem').textContent,
                    precio: producto.querySelector('.precioItem').textContent,
                    id: producto.querySelector('button').getAttribute('id'),
                    cantidad: 1
                };

                const existe = articulosCarrito.some(producto => producto.id === productoAgregado.id)
                if (existe) {
                    /* Agregar al carrito un producto ya existente */
                    const productos = articulosCarrito.map(producto => {
                        if (producto.id === productoAgregado.id) {
                            /*selecciono el ttulo del producto:*/
                            const tituloDelProducto = carrito.querySelectorAll(".producto-contenido__titulo");
                            /* recorro cada titulo: */
                            for (let i = 0; i < tituloDelProducto.length; i++) {
                                /* si los titulos de los productos son iguales: */
                                if (tituloDelProducto[i].innerText === producto.nombre) {
                                    /* llamo a la clase que contiene el input */
                                    let cantidadDeProductos = tituloDelProducto[i].parentElement.parentElement.querySelector(".producto-cantidad__input");
                                    /* parseo el value xq si no no me lo cambia: y ademas le aumento el value en 1 */
                                    producto.cantidad = Number(cantidadDeProductos.value) + Number(1);
                                    /* actualizo el total del carrito: */
                                    actualizarTotalDelCarrito();
                                    /* ahora se pueden agregar productos tanto desde las cards como del carrito y se van sumando correctamente sin ningun tipo de bug,
                                    es decir por ej: si yo clickeo en la card de algun producto 2 veces, se le aumenta el value a 2 en el modal del carrito
                                    y si aumento el valor del input en el modal del carrito se va sumano correctamente*/

                                    /* alert: */
                                    Command: toastr["success"]("Tu producto se agregó correctamente al carrito", "Producto agregado ")
                                    toastr.options = {
                                        "closeButton": true,
                                        "debug": false,
                                        "newestOnTop": false,
                                        "progressBar": false,
                                        "positionClass": "toast-top-center",
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
                                };
                            };
                            producto.precio = `${productoAgregado.precio}`;
                            return producto;
                        } else {
                            return producto;
                        };
                    });
                    articulosCarrito = [...productos];
                } else {
                    /* Agregar al carrito un producto que no estaba antes*/
                    articulosCarrito = [...articulosCarrito, productoAgregado];
                };
                insertarCarritoHTML();
            };

            function insertarCarritoHTML() {
                borrarHTML();
                articulosCarrito.forEach(producto => {
                    /* Destrucuring sobre el objeto producto */
                    const { nombre, imagen, precio, cantidad, id } = producto;
                    /* los productos s van agregando en filas dentro del modal del carrito: */
                    const row = `           
        <div class="carrito__producto">
            <div class="producto-contenido carrito__producto-item">
                <img class="producto-contenido__img" src="${imagen}" alt="">
                <h6 class="producto-contenido__titulo">${nombre}</h6>
            </div>
            <div class="producto-precio carrito__producto-item">
                <p>${precio}</p>
            </div>
            <div class="producto-cantidad carrito__producto-item">
                <input class="producto-cantidad__input" type="number" id="${id}" value="${Number(cantidad)}">
                <button class="botones producto-cantidad__button botonEliminar" id="${id}">X</button>
            </div>
        </div>`;
                    carrito.innerHTML += row;
                    const cantidadDelProducto = carrito.querySelectorAll(".producto-cantidad__input");
                    cantidadDelProducto.forEach(cantidadInput => {
                        cantidadInput.addEventListener("change", cantidadCambiada);
                    });
                });
                /* muestro la cantidad de productos en el carrito a modo notificacion: */
                mostrarNotificacion()
                actualizarTotalDelCarrito();
                guardarStorage();
            };

            function mostrarNotificacion() {
                let mostrarCantidadDeProductos = [];
                for (let i = 0; i < articulosCarrito.length; i++) {
                    mostrarCantidadDeProductos.push(articulosCarrito[i].cantidad)
                };
                mostrarCantidadDeProductos = [...mostrarCantidadDeProductos].reduce((acc, el) => acc + el, 0);
                const notificacionCarrito = document.querySelectorAll(".notificacion-carrito");
                notificacionCarrito.forEach(notificacion => {
                    notificacion.innerHTML = mostrarCantidadDeProductos;
                });
            };

            function cantidadCambiada(e) {
                const input = e.target;
                /* para que el input no tnga negativos */
                input.value <= 0 ? (input.value = 1) : null;
                /* actualizamos el precio al cambiar la cantidad: */
                actualizarTotalDelCarrito();
            };

            /* guaramos los productos en localstorage: */
            function guardarStorage() {
                localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
            };

            /* para evitar qu s repitan los productos en el carrito: */
            function borrarHTML() {
                while (carrito.firstChild) {
                    carrito.removeChild(carrito.firstChild);
                    actualizarTotalDelCarrito()
                };
            };
            /* funion para saber el $ total del carrito: */
            function actualizarTotalDelCarrito() {
                let total = 0;
                /* este es el P que muestra el total: */
                const totalDelCarrito = document.querySelector(".carrito__total");

                /* aca slccionamos el precio de cada producto que se agrega al carrito */
                const itemsDelCarrito = document.querySelectorAll(".carrito__producto");

                /* recorremos  toos los productos dentro del carrito: */
                itemsDelCarrito.forEach(itemsDelCarrito => {
                    /* obtenemos el precio del producto, parseado a numero, y eliminando el signo $: */
                    const precioDelProductoEnElCarrito = Number(itemsDelCarrito.querySelector(".producto-precio p").textContent.replace("$", ""));
                    const cantidadDeItems = Number(itemsDelCarrito.querySelector(".producto-cantidad__input").value);
                    /* y el total lo sumamos al precio de productos por la cantidad de losmismos: */
                    total = total + precioDelProductoEnElCarrito * cantidadDeItems;
                });
                /* guardamos el total en el P(el que tengo en el html para indicar el total del carrito),
                 el toFixed es para que el precio muestre en este caso hasta 2 decimales */
                totalDelCarrito.innerHTML = ` $${total.toFixed(2)}`;
            };
        },
        error: function(xhr, status, errorThrown) {
            console.log(xhr)
            console.log(status)
            console.log(errorThrown)

        }
    });
});