let productos = [
    {id: 123, 
        nombre: "Maxi Buzo Sirenita",
        categoria: "Maxi buzos",
        stock: 4,
        precio: 7500
    },
    {id: 133, 
        nombre: "Maxi Buzo Gato",
        categoria: "Maxi buzos",
        stock: 2,
        precio: 7500
    },
    {id: 143, 
        nombre: "Maxi Buzo Bob",
        categoria: "Maxi buzos",
        stock: 1,
        precio: 7500
    },
    {id: 213, 
        nombre: "Maxi Buzo Stitch kids",
        categoria: "Maxi buzos",
        stock: 3,
        precio: 7100
    },
    {id: 223, 
        nombre: "Maxi Buzo Angel kids",
        categoria: "Maxi buzos",
        stock: 5,
        precio: 7100
    },
    {id: 233, 
        nombre: "Maxi buzo Hombre Araña kids",
        categoria: "Maxi buzos",
        stock: 2,
        precio: 7100
    },
    {id: 313, 
        nombre: "Remerón Mickey adulto",
        categoria: "Remerones",
        stock: 1,
        precio: 5500
    },
    {id: 323, 
        nombre: "Remerón Silvestre adulto",
        categoria: "Remerones",
        stock: 7,
        precio: 5500
    },
    {id: 333, 
        nombre: "Remerón Kitty adulto",
        categoria: "Remerones",
        stock: 5,
        precio: 5500
    },
    {id: 413, 
        nombre: "Remerón Sirenita kids",
        categoria: "Remerones",
        stock: 3,
        precio: 4900
    },
    {id: 423, 
        nombre: "Remerón Alicia Tattoo kids",
        categoria: "Remerones",
        stock: 9,
        precio: 4900
    },
    {id: 433, 
        nombre: "Remeron Bugs Bunny kids",
        categoria: "Remerones",
        stock: 2,
        precio: 4900
    },
    {id: 513, 
        nombre: "Vestido Stitch+Angel",
        categoria: "Vestidos",
        stock: 6,
        precio: 5400
    },
    {id: 523, 
        nombre: "Vestido Cruella",
        categoria: "Vestidos",
        stock: 5,
        precio: 5400
    },
    {id: 533, 
        nombre: "Vestido Pato Lucas",
        categoria: "Vestidos",
        stock: 4,
        precio: 5400
    },
    {id: 613, 
        nombre: "Vestido Bob kids",
        categoria: "Vestidos",
        stock: 2,
        precio: 4800
    },
    {id: 623, 
        nombre: "Vestido Mickey kids",
        categoria: "Vestidos",
        stock: 9,
        precio: 4800
    },
    {id: 633, 
        nombre: "Vestido Gato kids",
        categoria: "Vestidos",
        stock: 5,
        precio: 4800
    }
]

let carrito = []

let mensajePrincipal = "Usted está en la tienda online de Fulanos. Bienvenid@\n\nElija la opción deseada:\n1 - Ver todos los productos disponibles.\n2 - Filtrar productos por categoría.\n3 - Filtrar productos por precio máximo a abonar.\n4 - Ver información de los productos.\n5 - Ordenar los productos por orden alfabético\n6 - Ordenar los productos por precio (descendente)\n0 - Para salir"

let listaCategorias = []
productos.forEach(producto => {
    if (!listaCategorias.includes(producto.categoria)){
        listaCategorias.push(producto.categoria)
    }
})

do {
    eleccion = Number(prompt(mensajePrincipal))
    if (eleccion === 1) {
        alert(listarProductos(productos))
    }else if (eleccion === 2){
        let categoria = prompt(`Ingrese categoria que desea filtrar: ${listaCategorias}`).toLowerCase()
        let productosFiltradosCategoria = productos.filter(producto => (producto.categoria).toLowerCase() === categoria)
        alert(listarProductos(productosFiltradosCategoria))
    }else if (eleccion === 3){
        let precio = Number(prompt("Ingrese el monto máximo que desea abonar por producto"))
        let productosFiltradosPrecio = productos.filter(producto => producto.precio <= precio)
        alert(listarProductos(productosFiltradosPrecio))
    }else if (eleccion === 4){
        let id = Number (prompt("Ingrese el ID del producto que desea obtener más info\n" + listarProductos(productos)))
        detalleProductoID(id)
    }else if (eleccion === 5){
            productos.sort ((a, b) => {
            if (a.nombre > b.nombre) {
                return 1
            }
            if (a.nombre < b.nombre) {
                return -1
            }
            return 0
        })
        alert(listarProductos(productos))
    }else if (eleccion === 6){
        productos.sort ((a, b) => {
        if (a.precio < b.precio) {
            return 1
        }
        if (a.precio > b.precio) {
            return -1
        }
        return 0
    })
    alert(listarProductos(productos))
}
} while (eleccion != 0)

// Elecciones 1, 2, 3, 5 y 6
function listarProductos(productos) {
    let salida = productos.map(producto => `ID: ${producto.id}. Producto: ${producto.nombre}. Precio: ${producto.precio}`).join("\n")
    return salida
} 

// ELeccion 4
function detalleProductoID(id) {
    let productoElegido = productos.find(producto => producto.id === id)
    alert(`Nombre: ${productoElegido.nombre}. Categoria: ${productoElegido.categoria}. Stock: ${productoElegido.stock}. Precio: ${productoElegido.precio}`)
}