// Seteamos el comportamiento de los mensajes popup
function mostrarPopup (msg) {
    document.querySelector(".popup p").innerHTML = msg;
    document.querySelector(".popup").style = "visibility:visible; opacity:1"
    setTimeout( () => {document.querySelector(".popup").style = "visibility:hidden; opacity:0"}, 1800);
}

// var image = document.getElementsByClassName('thumbnail');
// new simpleParallax(image, {
//     overflow: 'true',
//     delay: '0.5'
// });

anime({
    targets:'.logo_portada',
    keyframes:[
        {translateY: -550},
        {translateY:0}
    ]
})

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed:800,
    autoplay:{delay: 3000},
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
  });


// Escondemos el navbar al hacer scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {

    let currentScrollPos = window.pageYOffset;  

    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-12vh";
    }

    prevScrollpos = currentScrollPos;
}

// function actualizarIconoCarrito() {
//     // Reseteamos el contador en el icono carrito
//     let numeroCarrito = document.querySelector(".numeroCarrito");
//     numeroCarrito.innerHTML = "";
//     let itemsEnCarrito = 0;
//     if (localStorage.getItem("carrito")) {
//         let carrito = JSON.parse(localStorage.getItem("carrito"));
//         for (let item of carrito) {
//             itemsEnCarrito += item.cantidad;
//         }
//         // Actualizamos la cantidad de elementos agregados en el icono de carrito
//         let numeroCarrito = document.querySelector(".numeroCarrito");
//         numeroCarrito.innerHTML = `${itemsEnCarrito}`; 
//     }
// }

// actualizarIconoCarrito();




