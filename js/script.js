class Producto {
    constructor (titulo, descripcion, precio) {
        this.id = contadorId;
        contadorId++;
        this.image = `../img/tienda/${this.id}.png`;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = 1;
    }

    enlistarProducto() {
        let tarjeta = document.createElement("div");
        tarjeta.className = "producto";
        tarjeta.id = this.id;
        tarjeta.innerHTML = `<img class="producto-imagen"src=${this.image}>
                            <h2 class="producto-titulo">${this.titulo}</h2>
                            <p class="producto-descripcion">${this.descripcion}</p>
                            <h3 class="producto-precio">US$ ${this.precio}</h3>
                            <div id=${this.id} class="btn_servicios btn_tienda"><a href="#"><h3>Agregar al carrito</h2></a></div>`;
        
        let contenedor = document.querySelector(".contenedor-tienda");
        contenedor.append(tarjeta);
    }
}

class Carrito {
    constructor() {
        this.agregados = [];
        this.total = 0;
    }
    
    agregarProducto(producto) {
        // Si el producto no se encuentra en el carrito, lo agregamos. De lo contrario aumentamos su cantidad en 1
        let resultado = this.agregados.find(x => x.id == producto.id);
        if (typeof(resultado) == "undefined") {
            this.agregados.push(producto);
        } else {
            resultado.cantidad++;
        } 
        this.total += producto.precio;
    }

    devolverTotal() {
        this.agregados.forEach(x => console.log(x));
        return(`La suma de los productos seleccionados es $${this.total}`); 
    }
}

function buscarProducto(id) {
    let resultado = listaProductos.find(x => x.id == id);
    return resultado;
}

// Creamos productos de prueba y los agregamos a la lista de productos

let contadorId = 0;

const producto1 = new Producto ("Casco LS2 Carbon", "Casco de fibra de carbono diseñado para ruta", 570);
const producto2 = new Producto ("Casco LS2 Arrow", "Casco de alto rendimiento para pilotos", 440);
const producto3 = new Producto ("Casco LS2 Pioneer", "Casco de competición ultra liviano", 480);

const listaProductos = [];
// Agregamos productos a la lista
listaProductos.push(producto1, producto2, producto3);
// Los mostramos en la página
for (let producto of listaProductos) {
    producto.enlistarProducto();
}

let btn_tienda = document.getElementsByClassName("btn_tienda");
const carrito = new Carrito;

// Escuchamos el evento click en los botones de la tienda
for (let btn of btn_tienda) {
    btn.onclick = () => {console.log(`Agregado el producto con el id=${btn.id}`)};
    btn.onclick = () => {carrito.agregarProducto(buscarProducto(btn.id))};
}



// Creamos un nuevo carrito y agregamos distintos productos

// const carrito = new Carrito;
// carrito.agregarProducto(listaProductos[0]);
// carrito.agregarProducto(listaProductos[1]);
// carrito.agregarProducto(listaProductos[2]);
// carrito.agregarProducto(listaProductos[1]);


// console.log(carrito.devolverTotal());






// Escondemos el navbar al hacer scroll

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {

    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-15vh";
    }

    prevScrollpos = currentScrollPos;

}