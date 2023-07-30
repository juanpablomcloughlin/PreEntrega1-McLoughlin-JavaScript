// Login + primer paso para realizar compra de maxi buzos en tienda online fulanosunderwear.com

// Primero realizaremos el login en nuestra tienda online --> el usuario tendrá 3 intentos, caso contrario se bloquear
// user: jpml *ya registrado*
// pass: 1234

// El usuario ingresará la cantidad de productos a adquirir.
// Se calcula en forma automática el importe a abonar por el pedido.
// Se invita al usuario a finalizar la compra en la página online.

let passRegistrada = "1234"

const login = () => {
    let ingresar = false;

    for (let i = 3; i > 0; i--){
        alert ("Su usuario ya se encuentra registrado en nuestra base de datos es JPML....debés aceptar para continuar el login");
        let passIngresada = prompt(`Ingresa tu constraseña. Recordá que tenés ${i} intentos `)

        if (passIngresada === passRegistrada) {
            alert ("El login ha sido exitoso")
            ingresar = true
            break
        }else {
            alert("La contraseña ingresada es incorrecta")
        }
    }

    return (ingresar)
}

if (login()){
    function calcularCostoTotalMaxiBuzos() {
        const cantidadDeProductos = +(prompt("Ingrese la cantidad de maxi buzos que desea comprar"));
    
        let costoTotal = cantidadDeProductos*7500;
            for (let i=1; i <= cantidadDeProductos; i++) {
            const precioProducto = alert("El precio unitario de los maxi buzos es de $7500");
        alert (`El costo total a abonar por los ${cantidadDeProductos} Maxi Buzos es de: ${costoTotal}`)
        alert ("Te pedimos que por favor ingreses en nuestra tienda fulanosunderwear.com para finalizar la compra. Muchas gracias")
        break
    }
    }
    calcularCostoTotalMaxiBuzos()
} else {
    console.log("Su usuario ha sido bloqueado")
}

