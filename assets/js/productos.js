// Array de productos
const productos = [
    { id: 1, nombre: "Bolso Rojo", precio: 39, imagen: "../assets/img/bolso-rojo.jpg" },
    { id: 2, nombre: "Bolso Azul", precio: 32, imagen: "../assets/img/bolso-azul.jpg" },
    { id: 3, nombre: "Bolso Amarillo", precio: 45, imagen: "../assets/img/bolso-amarillo.jpg" },
    { id: 4, nombre: "Bolso Marron", precio: 36, imagen: "../assets/img/bolso-marron.jpg" },
    { id: 5, nombre: "Bolso Rosa", precio: 38, imagen: "../assets/img/bolsorosa.jpg" },
    { id: 6, nombre: "Bolso Rosa/Verde", precio: 49, imagen: "../assets/img/bolso-rosaverde.jpg" }
];

// Obtener carrito del localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos
const contenedor = document.getElementById("productos");

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto-card");

        const itemEnCarrito = carrito.find(p => p.id === producto.id);
        const cantidad = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>€${producto.precio}</p>
        <button class="btn agregar-btn" data-id="${producto.id}">
        Agregar al carrito
        </button>
        <p class="cantidad-texto">Cantidad en carrito: <span id="cantidad-${producto.id}">${cantidad}</span></p>
    `;

        contenedor.appendChild(div);
    });

    asignarEventosAgregar();
}

// Asignar eventos a los botones de "Agregar al carrito"
function asignarEventosAgregar() {
    const botones = document.querySelectorAll(".agregar-btn");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}

// Agregar producto o aumentar cantidad
function agregarAlCarrito(id) {
    const productoExistente = carrito.find(p => p.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos.find(p => p.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarCantidadVisible(id);

    // Mostrar toast de confirmación con SweetAlert2
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: 'El bolso fue añadido al carrito 👜',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
}

// Actualizar contador de ítems totales en el header
function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = 0;
    carrito.forEach(producto => {
        total += parseInt(producto.cantidad) || 0;
    });

    if (contador) {
        contador.textContent = total;
    }
}

// Actualizar cantidad visible debajo del producto
function actualizarCantidadVisible(id) {
    const item = carrito.find(p => p.id === id);
    const span = document.getElementById(`cantidad-${id}`);
    if (span && item) {
        span.textContent = item.cantidad;
    }
}

// Inicializar
mostrarProductos(productos);
actualizarContadorCarrito();