// Seteamos el comportamiento de los mensajes popup
function mostrarPopup (msg) {
    document.querySelector(".popup p").innerHTML = msg;
    document.querySelector(".popup").style = "visibility:visible; opacity:1"
    setTimeout( () => {document.querySelector(".popup").style = "visibility:hidden; opacity:0"}, 1800);
}


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

function actualizarIconoCarrito() {
    // Reseteamos el contador en el icono carrito
    let numeroCarrito = document.querySelector(".numeroCarrito");
    numeroCarrito.innerHTML = "";
    let itemsEnCarrito = 0;
    if (localStorage.getItem("carrito")) {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        for (let item of carrito) {
            itemsEnCarrito += item.cantidad;
        }
        // Actualizamos la cantidad de elementos agregados en el icono de carrito
        let numeroCarrito = document.querySelector(".numeroCarrito");
        numeroCarrito.innerHTML = `${itemsEnCarrito}`; 
    }
}

actualizarIconoCarrito();




