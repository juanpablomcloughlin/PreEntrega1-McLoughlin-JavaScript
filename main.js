principal();

function principal() {
    let productosOriginal = [
    { id: 123, nombre: "Maxi Buzo Sirenita", categoria: "Maxi buzos", stock: 4, precio: 7500, edad: "adultos", rutaImagen: "./images/maxibuzosirenita.jpeg"},
    { id: 133, nombre: "Maxi Buzo Gato", categoria: "Maxi buzos", stock: 2, precio: 7500, edad: "adultos",rutaImagen: "./images/maxibuzogato.jpeg"},
    { id: 143, nombre: "Maxi Buzo Bob", categoria: "Maxi buzos", stock: 1, precio: 7500, edad: "adultos", rutaImagen: "./images/maxibuzobob.jpeg"},
    { id: 213, nombre: "Maxi Buzo Stitch kids", categoria: "Maxi buzos", stock: 3, precio: 7100, edad: "kids",rutaImagen: "./images/maxibuzostitchkids.jpg"},
    { id: 223, nombre: "Maxi Buzo Angel kids", categoria: "Maxi buzos", stock: 5, precio: 7100, edad: "kids", rutaImagen: "./images/maxibuzoangelkids.jpg"},
    { id: 233, nombre: "Maxi buzo Hombre Araña kids", categoria: "Maxi buzos", stock: 2, precio: 7100, edad: "kids", rutaImagen: "./images/maxibuzohombrearaniakids.jpg"},
    { id: 313, nombre: "Remerón Mickey adulto", categoria: "Remerones", stock: 1, precio: 5500, edad: "adultos", rutaImagen: "./images/remeronmickeyadulto.jpeg"},
    { id: 323, nombre: "Remerón Silvestre adulto", categoria: "Remerones", stock: 7, precio: 5500, edad: "adultos", rutaImagen: "./images/remeronsilvestreadulto.jpeg"},
    { id: 333, nombre: "Remerón Kitty adulto", categoria: "Remerones", stock: 5, precio: 5500, edad: "adultos", rutaImagen: "./images/remeronkittyadulto.jpeg"},
    { id: 413, nombre: "Remerón Sirenita kids", categoria: "Remerones", stock: 3, precio: 4900, edad: "kids", rutaImagen: "./images/remeronsirenitakids.jpg"},
    { id: 423, nombre: "Remerón Alicia Tattoo kids", categoria: "Remerones", stock: 9, precio: 4900, edad: "kids", rutaImagen: "./images/remeronaliciatattookids.jpg"},
    { id: 433, nombre: "Remeron Bugs Bunny kids", categoria: "Remerones", stock: 2, precio: 4900, edad: "kids", rutaImagen: "./images/remeronbugsbunnykids.jpg"},
    { id: 513, nombre: "Vestido Stitch+Angel", categoria: "Vestidos", stock: 6, precio: 5400, edad: "adultos", rutaImagen: "./images/vestidostitch+angel.jpeg"},
    { id: 523, nombre: "Vestido Cruella", categoria: "Vestidos", stock: 5, precio: 5400, edad: "adultos", rutaImagen: "./images/vestidocruella.jpeg"},
    { id: 533, nombre: "Vestido Pato Lucas", categoria: "Vestidos", stock: 4, precio: 5400, edad: "adultos", rutaImagen: "./images/vestidopatolucas.jpg"},
    { id: 613, nombre: "Vestido Bob kids", categoria: "Vestidos", stock: 2, precio: 4800, edad: "kids", rutaImagen: "./images/vestidobobkids.jpg" },
];

    let inputBuscador = document.getElementById("buscador")
    let botonBuscar = document.getElementById("buscar")
    botonBuscar.addEventListener("click", () =>
    filtrar(productosOriginal, inputBuscador, "nombre")
);

    let filtrosCategoria = document.getElementsByClassName("filtroCategoria")
    for (const filtroCategoria of filtrosCategoria) {
    filtroCategoria.addEventListener("click", () =>
    filtrar(productosOriginal, filtroCategoria, "categoria")
    );
}

    let filtrosEdad = document.getElementsByClassName("filtroEdad")
    for (const filtroEdad of filtrosEdad) {
    filtroEdad.addEventListener("click", () =>
    filtrar(productosOriginal, filtroEdad, "edad")
    );
}

    let botonFiltrarPorPrecio = document.getElementById("filtrarPorPrecio")
    botonFiltrarPorPrecio.addEventListener("click", () =>
    filtrarPorPrecio(productosOriginal)
);

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
    botonAgregarAMiCarrito.addEventListener("click", (e) =>
    agregarAlCarrito(productos, e)
    )
})
}

function agregarAlCarrito(productos, e) {
    let carrito = recuperarCarrito();
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
    return localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito"))
    : []
}

function finalizarCompra() {
    let carrito = recuperarCarrito()
    if (carrito.length > 0) {
    localStorage.removeItem("carrito")
    renderizarCarrito()
    alert("Muchas gracias por su compra")

    let productos = document.getElementById("productos")
    let carrito = document.getElementById("carrito")
    productos.style.display = "block"
    carrito.style.display = "none"
} else {
    alert("Tu carrito está vacío. Agregá productos")
}
}