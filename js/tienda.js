class Producto {

    constructor (id, titulo, descripcion, precio) {
        this.id = id;
        this.image = `../img/tienda/${this.id}.png`;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = 1;
    }
}

function enlistarProductos() {
   
    for (let producto of listaProductos) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "producto";
        tarjeta.id = this.id;
        tarjeta.innerHTML = `<div class="producto-arriba"><img class="producto-imagen"src=${producto.image}>
                            <h4 class="producto-titulo">${producto.titulo}</h4>
                            <p class="producto-descripcion">${producto.descripcion}</p>
                            </div>
                            <div class="producto-abajo"><h3 class="producto-precio">US$ ${producto.precio}</h3>
                            <a><div id=${producto.id} class="btn btn_tienda btn_primario noselect"><h3>Agregar al carrito</h2></div></a>
                            </div>`;
        
        let contenedor = document.querySelector(".contenedor-tienda");
        contenedor.append(tarjeta);
    }
}

function productoExiste(titulo, id) {

    let productos = JSON.parse(localStorage.getItem("productos"));
    for (let i in productos) {
        if (i.titulo == titulo || i.id == id) {
            return true;
        }
        return false;
    }
} 

function nuevoProducto (titulo, descripcion, precio) {

    const producto = new Producto (contadorId, titulo, descripcion, precio);
    
    if (localStorage.getItem("productos")) {
        if (!productoExiste(titulo, -1)) {
            listaProductos.push(producto);
            localStorage.setItem("productos", JSON.stringify(listaProductos));
            contadorId++;
        }
    } else {
        listaProductos.push(producto);
        localStorage.setItem("productos", JSON.stringify(listaProductos));
    }
    return producto;
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
                // Toastify({

                //     text: "Producto agregado al carrito",
                    
                //     duration: 3000,
                    
                //     style: {background: "#79AEA3", color: "fff"}
                //     }).showToast();
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
                // Toastify({

                //     text: "Producto agregado al carrito",
                    
                //     duration: 3000,
                    
                //     style: {background: "#79AEA3", color: "fff"}
                //     }).showToast();
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
        // Toastify({

        //     text: "Producto agregado al carrito",
            
        //     duration: 3000,
            
        //     style: {background: "#79AEA3", color: "fff"}
        //     }).showToast();
    }
}



function deleteFromCarrito(id) {
    // Nos conectamos al botón delete del elemento
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    
    for (let item of carrito) {
        if (item.id == id) {
            let index = carrito.indexOf(item);
            carrito.splice(index, 1);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Toastify({

    //     text: "Producto eliminado del carrito",
        
    //     duration: 3000,
        
    //     style: {background: "#79AEA3", color: "fff"}
    //     }).showToast();

    actualizarCarrito();
}



function actualizarCarrito() {

    if (localStorage.getItem("carrito")) {
        // Nos conectamos al elemento contenedor del carrito

        let carrito = JSON.parse(localStorage.getItem("carrito"));
        let bodyCarrito = document.querySelector(".body_carrito");
        if (carrito.length > 0) {
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
        } else {
            bodyCarrito.innerHTML = "";
            return;
        }   
        
        let subTotal = 0;

        // Para cada elemento en el carrito, creamos una nueva fila con la info y la insertamos en en carrito
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
                                <div class="item_precioSuma"><p>US$ ${precioSuma}</p><img src="../img/delete.svg" id="${item.id}" class="btn_deleteItem"></img></div>
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

        // Escuchamos el evento click en los botones de elimiar items
        let btn_deleteItem = document.getElementsByClassName("btn_deleteItem");
        
        for (let btn of btn_deleteItem) {
            btn.addEventListener("click", () => {deleteFromCarrito(btn.id)})
        }
    } 
}

async function obtenerProductos() {
    // Obtenemos la lista de productos del archivo json y devolvemos un array de productos
    return fetch('../assets/productos.json')
    .then(response => response.json())  
    .then(response => {
        for (i of response) {
            // Creamos los productos a partir del archuvo json
            let producto = nuevoProducto(i.nombre, i.descripcion, parseInt(i.precio));
        }
    });
}

async function main() {

    listaProductos = [];
    contadorId = 0;

    await obtenerProductos();
    
    enlistarProductos();
    // Escuchamos el evento click en los botones de la tienda
    let btn_tienda = document.getElementsByClassName("btn_tienda");
    for (let btn of btn_tienda) {
        console.log(btn);
        btn.addEventListener("click", () => {addToCarrito(btn.id)});
    }   

    actualizarCarrito();
}


main();









