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
                            <a href=#><div id=${this.id} class="btn btn_tienda btn_primario"><h3>Agregar al carrito</h2></div></a>
                            </div>`;
        
        let contenedor = document.querySelector(".contenedor-tienda");
        contenedor.append(tarjeta);
    }
}


function nuevoProducto (titulo, descripcion, precio) {
    const producto = new Producto (contadorId, titulo, descripcion, precio);
    listaProductos.push(producto);
    contadorId++;
    
    if (localStorage.getItem("productos")) {
        let productos = JSON.parse(localStorage.getItem("productos"));
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
    } else {
        let productos = [];
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
    }
}


function addToCarrito(id) {

    // Chequeamos si existe el carrito en el localstorage
    if (localStorage.getItem("carrito")) {
        let carrito = JSON.parse(localStorage.getItem("carrito"));

        // Aumentamos el contador de carrito
        let contadorCarrito = JSON.parse(localStorage.getItem("contadorCarrito"));
        contadorCarrito++;
        localStorage.setItem("contadorCarrito", JSON.stringify(contadorCarrito));
        
        // Existe un elemento en el carrito que coincida con el id que estoy agregando?
        for (let i of carrito) {
            if (i.id == id) {
                // Si existe, aumentamos su cantidad
                i.cantidad++;
                localStorage.setItem("carrito", JSON.stringify(carrito));

                actualizarCarrito();
                mostrarPopup("Producto agregado correctamente");
                return;
            }
        }
        // Si no existe, vamos a la lista de productos, buscamos el elemento que necesitamos, y lo agregamos al carrito
        let productos = JSON.parse(localStorage.getItem("productos"));
        for (let i of productos) {
            if (i.id == id) {
                carrito.push(i);
                localStorage.setItem("carrito", JSON.stringify(carrito));

                actualizarCarrito();
                mostrarPopup("Producto agregado correctamente");
                return;
            }
        }

    // Si no existe el carrito, creamos uno y agregamos el elemento
    } else {
        let carrito = [];
        let productos = JSON.parse(localStorage.getItem("productos"));

        for (let i of productos) {
            if (i.id == id) {
                carrito.push(i);
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }
        }        

        let contadorCarrito = 1;
        localStorage.setItem("contadorCarrito", JSON.stringify(contadorCarrito));

        actualizarCarrito();
        mostrarPopup("Producto agregado correctamente");
    }
}


function actualizarCarrito() {

    if (localStorage.getItem("carrito")) {
        // Nos conectamos al elemento contenedor del carrito
        let bodyCarrito = document.querySelector(".body_carrito");
        // Creamos los títulos
        bodyCarrito.innerHTML = `<h3>Productos en tu carrito</h3>
                                <div class="item_label">
                                <b class="label_titulo">Item</b>
                                <b class="label_cantidad">Cantidad</b>
                                <b class="label_precio">Precio unitario</b>
                                <b class="label_suma">Suma</b>
                                </div>
                                <hr>
                                `;
        // Para cada elemento en el carrito, creamos una nueva fila con la info y la insertamos en en carrito
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        let subTotal = 0;

        for (let item of carrito) {
            let precioSuma = item.precio * item.cantidad;
            subTotal = subTotal + precioSuma; 
            let item_data = document.createElement("div");
            item_data.className = "item_data";
            item_data.innerHTML = `
                                <div class="item_img"><img src="../img/tienda/${item.id}.png" alt=""></div>
                                <div class="item_titulo"><p>${item.titulo}</p></div>
                                <div class="item_cantidad"><p>${item.cantidad}</p></div>
                                <div class="item_precio"><p>US$ ${item.precio}</p></div>
                                <div class="item_precioSuma"><p>US$ ${precioSuma}</p></div>
                                `;
            // Agregamos el contenido a la página
            bodyCarrito.appendChild(item_data);
        }
        let envio = 10;

        let total = envio + subTotal;
    
        let carrito_suma = document.createElement("div");
        carrito_suma.className = "carrito_suma";
        carrito_suma.innerHTML = `
                                <p class="suma_subtotal_texto">Subtotal</p><p class="suma_subtotal_data">US$ ${subTotal}</p>
                                <p class="suma_envio_texto">Envío</p><p class="suma_envio_data">US$ 10</p>
                                <div class="linea"></div>
                                <b class="suma_total_texto">Total</b><b class="suma_total_data">US$ ${total}</b>
                                `;
        bodyCarrito.append(carrito_suma);
    } 
}



let listaProductos = [];
let contadorId = 0;

// Creamos productos de prueba y los agregamos a la lista de productos
nuevoProducto("Casco LS2 Carbon", "Casco de fibra de carbono diseñado para ruta", 570);
nuevoProducto("Casco LS2 Arrow", "Casco de alto rendimiento para pilotos", 440);
nuevoProducto("Casco LS2 Pioneer", "Casco de competición ultra liviano", 480);
nuevoProducto("Casco LS2 X-FORCE", "Casco de cross en fibra de carbono", 500);

// Los mostramos en la página
for (let producto of listaProductos) {
    producto.enlistarProducto();
}

// Escuchamos el evento click en los botones de la tienda
let btn_tienda = document.getElementsByClassName("btn_tienda");

for (let btn of btn_tienda) {
    btn.addEventListener("click", () => {addToCarrito(btn.id)});
}

// Actualizamos el carrito cada vez que cargamos la página
actualizarCarrito();


