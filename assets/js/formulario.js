// Obtener elementos del DOM
const form = document.getElementById("form-compra");
const resumenLista = document.getElementById("resumen-lista");
const resumenTotal = document.getElementById("resumen-total");

// Mostrar resumen del pedido
function mostrarResumen() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    resumenLista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
        const cantidad = producto.cantidad || 1;
        const subtotal = producto.precio * cantidad;

        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x${cantidad} - €${subtotal}`;
        resumenLista.appendChild(li);

        total += subtotal;
    });

    resumenTotal.textContent = `Total a pagar: €${total}`;
}

mostrarResumen();

// Validación y envío del formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const direccion = form.direccion.value.trim();

    // Validar campos vacíos
    if (!nombre || !email || !direccion) {
        Swal.fire({
            icon: "error",
            title: "Faltan campos obligatorios",
            text: "Por favor, completá todos los campos marcados con *",
        });
        return;
    }

    // Validar formato del email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        Swal.fire({
            icon: "error",
            title: "Email inválido",
            text: "Por favor, ingresá un correo electrónico válido",
        });
        return;
    }

    // Confirmación exitosa
    Swal.fire({
        icon: "success",
        title: "Pedido confirmado",
        text: "Gracias por tu compra",
        confirmButtonText: "Aceptar",
    }).then(() => {
        // Limpiar carrito y redirigir
        localStorage.removeItem("carrito");
        window.location.href = "gracias.html";
    });
});