function principal(productosOriginal) {
    let inputBuscador = document.getElementById("buscador")
    let botonBuscar = document.getElementById("buscar")
    botonBuscar.addEventListener("click", () =>
    filtrar(productosOriginal, inputBuscador, "nombre")
    )

    let filtrosCategoria = document.getElementsByClassName("filtroCategoria")
    for (const filtroCategoria of filtrosCategoria) {
    filtroCategoria.addEventListener("click", () =>
    filtrar(productosOriginal, filtroCategoria, "categoria")
    )
    }

    let filtrosEdad = document.getElementsByClassName("filtroEdad")
    for (const filtroEdad of filtrosEdad) {
    filtroEdad.addEventListener("click", () =>
    filtrar(productosOriginal, filtroEdad, "edad")
    )
    }

    let botonFiltrarPorPrecio = document.getElementById("filtrarPorPrecio")
    botonFiltrarPorPrecio.addEventListener("click", () =>
    filtrarPorPrecio(productosOriginal)
    )

    let verOcutarCarrito = document.getElementById("verCarrito")
    verOcutarCarrito.addEventListener("click", mostrarOcultar)

    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", finalizarCompra)

    renderizarCarrito()
    renderizarTarjetas(productosOriginal)   
}

function mostrarOcultar(e) {
    e.target.innerText === "Ver carrito" ? (e.target.innerText = "Ver productos") : (e.target.innerText = "Ver carrito")

    document.getElementById("productos").classList.toggle("oculto")
    document.getElementById("carrito").classList.toggle("oculto")
}

function filtrarPorPrecio(productos) {
    let precioMinimo = Number(document.getElementById("precioMinimo").value || 0)
    let precioMaximo = Number(document.getElementById("precioMaximo").value)

    let productosFiltrados = productos.filter((producto) => {
    return producto.precio >= precioMinimo && producto.precio <= precioMaximo
})

    renderizarTarjetas(productosFiltrados)
}

function filtrar(productos, input, propiedad) {
    let productosFiltrados = productos.filter((producto) =>
    producto[propiedad].toLowerCase().includes(input.value.toLowerCase())
    )
    renderizarTarjetas(productosFiltrados)
}

function renderizarTarjetas(productos) {
    let contenedor = document.getElementById("productos")
    contenedor.innerHTML = ""
    productos.forEach((producto) => {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "tarjetaProducto"
    tarjetaProducto.innerHTML = `
        <h4>${producto.nombre}</h4>
        <p>Precio $${producto.precio}</p>
        <p>Quedan ${producto.stock} unidades en stock</p>
        <img src="${producto.rutaImagen}">
        <button id=${producto.id}>Agregar a mi carrito</button>
        `
    contenedor.appendChild(tarjetaProducto)
    let botonAgregarAMiCarrito = document.getElementById(producto.id)
    botonAgregarAMiCarrito.addEventListener("click", (e) => agregarAlCarrito(productos, e)
    )
    })
}

function agregarAlCarrito(productos, e) {
    let carrito = recuperarCarrito()
    let productoOriginal = productos.find(({ id }) => id === Number(e.target.id))
    let { id, nombre, precio } = productoOriginal
    let productoEnCarrito = carrito.find(({ id }) => id === productoOriginal.id)

    if (productoEnCarrito) {
        productoEnCarrito.unidades++
        productoEnCarrito.subtotal =
        productoEnCarrito.precioUnitario * productoEnCarrito.unidades
    } else {
    carrito.push({
        id,
        nombre,
        precioUnitario: precio,
        subtotal: precio,
        unidades: 1,
        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))

    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.style.display = "block"

    renderizarCarrito()
    enviarToast("El producto se añadió a tu carrito con éxito")
}

function renderizarCarrito() {
    let contenedor = document.getElementById("carrito")
    contenedor.innerHTML = ""
    let carrito = recuperarCarrito()

    carrito.forEach(({ nombre, precioUnitario, unidades, subtotal }) => {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "tarjetaCarrito"
    tarjetaProducto.innerHTML = `
        <p>${nombre}</p>
        <p>${precioUnitario}</p>
        <p>${unidades}</p>
        <p>${subtotal}</p>
        `
    contenedor.appendChild(tarjetaProducto)
    })

    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    carrito.length > 0 ? (botonFinalizarCompra.style.display = "block") : (botonFinalizarCompra.style.display = "none")
}

function recuperarCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

function finalizarCompra() {
    let carrito = recuperarCarrito()
    if (carrito.length > 0) {
        localStorage.removeItem("carrito")
        renderizarCarrito()
        enviarAlerta("success", "Muchas gracias por tu compra", "El equipo de Fulanos Underwear ®")
        let productos = document.getElementById("productos")
        let carrito = document.getElementById("carrito")
        productos.style.display = "block"
        carrito.style.display = "none"
        } else {
        enviarAlerta("warning", "Tu carrito está vacío. Agregá productos", "El equipo de Fulanos Underwear")
    }
}

function enviarAlerta(icon, title, text) {
    Swal.fire({
        icon,
        title,
        text,
        background: "#fce09b",
        showConfirmButton: false,
        timer: 2000,
    })
}

function enviarToast(text) {
    Toastify({
        text,
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
        background: "#3f3f41",
        },
    }).showToast()
}

fetch("./info.json")
    .then((respuesta) => respuesta.json())
    .then((productosJSON) => principal(productosJSON))
    .catch((error) => enviarAlerta("warning", "Algo salió mal", "El equipo de Fulanos Underwear")
)