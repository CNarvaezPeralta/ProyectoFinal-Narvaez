const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");

// Verificación de existencia de elementos
if (listaCarrito && totalCarrito && btnVaciar) {

    // Obtener carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Mostrar el contenido del carrito
    function mostrarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const li = document.createElement("li");
            li.classList.add("item-carrito");

            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
                <div class="info-producto">
                    <strong>${producto.nombre}</strong><br>
                    Precio unitario: €${producto.precio}<br>
                    Cantidad: ${producto.cantidad}<br>
                    Subtotal: €${producto.precio * producto.cantidad}
                </div>
                <button class="eliminar-uno" data-index="${index}">-1</button>
            `;

            listaCarrito.appendChild(li);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = `Total: €${total}`;
        asignarEventosEliminar();
    }

    // Eliminar una unidad del producto
    function eliminarUnaUnidad(index) {
        carrito[index].cantidad--;

        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1); // Eliminar producto completamente
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }

    // Vaciar todo el carrito con SweetAlert2
    btnVaciar.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminarán todos los productos del carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.removeItem("carrito");
                mostrarCarrito();
                Swal.fire("Carrito vacío", "", "success");
            }
        });
    });

    // Asignar eventos a los botones de "-1"
    function asignarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll(".eliminar-uno");
        botonesEliminar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = parseInt(e.target.getAttribute("data-index"));
                eliminarUnaUnidad(index);
            });
        });
    }

    // Inicializar
    mostrarCarrito();
}