class Producto {
    constructor (id, titulo, descripcion, precio) {
        this.id = id;
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
        tarjeta.innerHTML = `<div class="producto-arriba"><img class="producto-imagen"src=${this.image}>
                            <h4 class="producto-titulo">${this.titulo}</h4>
                            <p class="producto-descripcion">${this.descripcion}</p>
                            </div>
                            <div class="producto-abajo"><h3 class="producto-precio">US$ ${this.precio}</h3>
                            <div id=${this.id} class="btn btn_tienda btn_primario"><a href="#carrito"><h3>Agregar al carrito</h2></a></div>
                            </div>`;
        
        let contenedor = document.querySelector(".contenedor-tienda");
        contenedor.append(tarjeta);
    }
}



class Carrito {
    constructor() {
        this.agregados = [];
        this.subTotal = 0;
    }
    
    agregarProducto(item) {
        // Si el producto no se encuentra en el carrito, lo agregamos y lo mostramos en el carrito. De lo contrario aumentamos su cantidad en 1
        contadorCarrito++;
        let existe = this.agregados.some(x => x.id == item.id);
        if (!existe) {
            this.agregados.push(item);
            // Nos conectamos al elemento contenedor
            let itemCarrito = document.querySelector(".item_carrito");
            // Creamos el elemento que vamos a insertar en la página de carrito
            let content = document.createElement("div");
            content.className = "item_data";
            content.id = `carrito${item.id}`;
            content.innerHTML = `<div class="item_img"><img src="../img/tienda/${item.id}.png" alt=""></div>
                                <div class="item_titulo"><p>${item.titulo}</p></div>
                                <div class="item_cantidad"><p>${item.cantidad}</p></div>
                                <div class="item_precio"><p>US$ ${item.precio}</p></div>
                                <div class="item_precioSuma"><p>US$ ${item.precio}</p></div>`;
            // Agregamos el contenido a la página
            itemCarrito.appendChild(content);
        } else {
            // Aumentamos la cantidad de ese producto
            item.cantidad++;
        } 
        this.actualizarCarrito(item);
    }

    actualizarCarrito(item) {

                // Actualizamos la cantidad y suma de este producto
                let item_cantidad = document.querySelector(`#carrito${item.id} .item_cantidad p`);
                item_cantidad.innerHTML = `${item.cantidad}`;
                let item_precioSuma = document.querySelector(`#carrito${item.id} .item_precioSuma p`);
                let suma = item.precio * item.cantidad;
                item_precioSuma.innerHTML = `US$ ${suma}`; 
        
                // Cambiamos el núnero que figura junto al icono de carrito
                let numeroCarrito = document.querySelector(".numeroCarrito");
                numeroCarrito.innerHTML = contadorCarrito;
                // Acutalizamos el subtotal y total en el carrito
                this.subTotal += item.precio;
                let subTotal = document.querySelector(".suma_subtotal_data");
                subTotal.innerHTML = `US$ ${this.subTotal}`;
                let total = document.querySelector(".suma_total_data");
                let sumaTotal = 10 + this.subTotal;
                total.innerHTML = `US$ ${sumaTotal}`;
    }

    devolverTotal() {
        this.agregados.forEach(x => console.log(x));
        return(`Tiene ${contadorCarrito} items en el carro que suman un total de $${this.total}`); 
    }
}



function nuevoProducto (titulo, descripcion, precio) {
    const producto = new Producto (contadorId, titulo, descripcion, precio);
    listaProductos.push(producto);
    contadorId++;
}



function buscarProducto(id) {
    let resultado = listaProductos.find(x => x.id == id);
    return resultado;
}



let listaProductos = [];
let contadorId = 0;
let contadorCarrito = 0;

// Creamos productos de prueba y los agregamos a la lista de productos
nuevoProducto("Casco LS2 Carbon", "Casco de fibra de carbono diseñado para ruta", 570);
nuevoProducto("Casco LS2 Arrow", "Casco de alto rendimiento para pilotos", 440);
nuevoProducto("Casco LS2 Pioneer", "Casco de competición ultra liviano", 480);
nuevoProducto("Casco LS2 X-FORCE", "Casco de cross en fibra de carbono", 500);

// Los mostramos en la página
for (let producto of listaProductos) {
    producto.enlistarProducto();
}

const carrito = new Carrito;

// Escuchamos el evento click en los botones de la tienda
let btn_tienda = document.getElementsByClassName("btn_tienda");

for (let btn of btn_tienda) {
    btn.addEventListener("click", () => {carrito.agregarProducto(buscarProducto(btn.id))});
}


