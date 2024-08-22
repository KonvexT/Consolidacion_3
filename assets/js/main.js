function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

function Carrito() {
    this.productos = [];
    
    this.agregarProducto = function(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    this.calcularCompra = function() {
        var total = 0;
        for (var item of this.productos) {
            total += item.producto.precio * item.cantidad;
        }
        return total;
    }

    this.mostrarDetalle = function() {
        var detalle = "Detalle de la compra:\n";
        for (var item of this.productos) {
            detalle += `${item.producto.nombre} - ${item.cantidad} unidad(es) - $${item.producto.precio * item.cantidad}\n`;
        }
        detalle += `TOTAL: $${this.calcularCompra()}`;
        return detalle;
    }
}

const productosExistentes = {
    1: { nombre: 'Leche', precio: 1000 },
    2: { nombre: 'Pan', precio: 2000 },
    3: { nombre: 'Queso', precio: 1200 },
    4: { nombre: 'Mermelada', precio: 890 },
    5: { nombre: 'Azúcar', precio: 1300 }
};

var carrito = new Carrito();

function mostrarProductos() {
    alert("Productos disponibles:\n1.- Leche $1000\n2.- Pan $2000\n3.- Queso $1200\n4.- Mermelada $890\n5.- Azúcar $1300");
}

function agregarAlCarrito() {
    mostrarProductos();
    
    var seleccionProducto = parseInt(prompt("Ingresa el número de producto que deseas agregar al carrito (1-5):"));
    
    if (!productosExistentes[seleccionProducto]) {
        alert("Selección no válida. Debes ingresar un número entre 1 y 5.");
        agregarAlCarrito();
        return;
    }
    
    var cantidadProducto = parseInt(prompt("Ingresa la cantidad de unidades:"));
    
    if (cantidadProducto > 0) {
        var productoSeleccionado = productosExistentes[seleccionProducto];
        carrito.agregarProducto(productoSeleccionado, cantidadProducto);
        alert(`${productoSeleccionado.nombre} - Cantidad: ${cantidadProducto}`);

        var continuarAgregando = prompt("¿Deseas seguir agregando productos? (s/n)").toLowerCase();
        if (continuarAgregando === 's') {
            agregarAlCarrito();
        } else {
            finalizarCompra();
        }
    } else {
        alert("Cantidad no válida. Debes ingresar un número positivo.");
        agregarAlCarrito();
    }
}

function finalizarCompra() {
    if (carrito.productos.length === 0) {
        alert("El carrito está vacío. No hay productos para finalizar.");
        return;
    }

    var detalleCompra = carrito.mostrarDetalle();
    alert(detalleCompra);

    
    carrito.productos = [];
    alert("¡Gracias por tu compra!");
}


agregarAlCarrito();