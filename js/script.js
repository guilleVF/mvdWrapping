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






