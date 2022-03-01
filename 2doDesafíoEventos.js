
//3er DESAFIO COMPLEMENTARIO - Agregado Interacción con DOM
//Se porpone realizar un simulador interactivo de un sitio de e-comerce de una Pastelería


//Las acciones a realiar serán:
//Presentación y saludo al cliente
//Ofrecer los rubros
//Ofrecer los productos de cada rubro
//Recibir las elecciones del cliente y calcular precio total
//Confirmar el pedido y cobrar el servicio

//VARIABLES
let texto = "";
let total = 0;

let arrayRubros = [];
let arrayProductos = [];
let arrayCarrito = [];

//ELEMENTOS DEL DOM
let divRubros = document.getElementById('divRubros')
let mostrarRubros = document.getElementById('mostrarRubros')
let divProductos = document.getElementById('divProductos')
let mostrarCarrito = document.getElementById('mostrarCarrito')
let divCarrito = document.getElementById('divCarrito')

//CLASES
class Rubro{

    constructor(id, nombre){
        this.id = id,
        this.nombre = nombre
    }
}

class Producto{
    
    constructor(id, rubro, nombre, precio){
        this.id = id,
        this.rubro = rubro,
        this.nombre = nombre,        
        this.precio = precio,
        this.cantidad = 0,
        this.subTotal = 0 
    }

    subtotalProducto() {
        this.subTotal = this.precio * this.cantidad;
    }
}



const inicializar = () =>{
    //Inicializo arreglo de Rubros
    arrayRubros.push(new Rubro(1,"Tortas Decoradas"));
    arrayRubros.push(new Rubro(2,"Pastelería Tradicional"));
    arrayRubros.push(new Rubro(3,"Rincón Salado"));
    //Inicializo arreglo de Productos
    arrayProductos.push(new Producto(1,"Tortas Decoradas","Torta Boda",5000))
    arrayProductos.push(new Producto(2,"Tortas Decoradas","Torta 15 años",4500))
    arrayProductos.push(new Producto(3,"Tortas Decoradas","Torta Bautismo y 1 Año",4000))
    arrayProductos.push(new Producto(1,"Pastelería Tradicional","CupCakes",400))
    arrayProductos.push(new Producto(2,"Pastelería Tradicional","CakePops",300))
    arrayProductos.push(new Producto(3,"Pastelería Tradicional","Cookies",200))
    arrayProductos.push(new Producto(1,"Rincón Salado","Fosforitos",150))
    arrayProductos.push(new Producto(2,"Rincón Salado","Brusquetas",200))
    arrayProductos.push(new Producto(3,"Rincón Salado","Canapes",180))
}

const rubrosDisponibles = () => {
   
 //   let rubroID;
    
    mostrarRubros.addEventListener('click', () => {
        for(let nombreRubros of arrayRubros){
            divRubros.innerHTML += `
                <div class="card" id="${nombreRubros.nombre}" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${nombreRubros.nombre}</h5>

                        <button class="btn btn-secondary" id="${nombreRubros.nombre}">Mostrar Productos</button>
                    </div>
                </div>
           `           
           divRubros.addEventListener('click',(e) =>{
            if(e.target && e.target.id === nombreRubros.nombre){
               productosDisponibles(nombreRubros.nombre)
            
               }
           }) 
        }
    })        
}

const productosDisponibles = (rubroElegido) =>{
    let arregloProductosDisponibles = (arrayProductos.filter((producto) => producto.rubro === rubroElegido))

    divProductos.innerHTML = ""
    for(let productosDisponibles of arregloProductosDisponibles){
        divProductos.innerHTML += `
            <div class="card" id="${productosDisponibles.nombre}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${productosDisponibles.nombre}</h5>
                    <p class="card-text">Precio: $${productosDisponibles.precio}</p>
                    <input type="number" placeholder="cantidad"  id="cantidad${productosDisponibles.nombre}">
                    <button class="btn btn-secondary" id="${productosDisponibles.nombre}">Agregar al Carrito</button>
                </div>
            </div>
       `           
       divProductos.addEventListener('click',(e) =>{
            if(e.target && e.target.id === productosDisponibles.nombre){

                let productoElegido = arregloProductosDisponibles.find((producto => producto.nombre === e.target.id))
                productoElegido.cantidad = document.getElementById(`cantidad${productosDisponibles.nombre}`).value
                productoElegido.subtotalProducto()
                arrayCarrito.push(productoElegido)
                console.log(productoElegido)
            }
       }) 
    
    }

}


const informarCompra = () =>{

    
    document.getElementById('mostrarCarrito').addEventListener('click', () =>{
        divCarrito.innerHTML = ''
        arrayCarrito.forEach(recorrerArray)
        total  = arrayCarrito.reduce((total, producto) => total + producto.subTotal, 0);
        divCarrito.innerHTML += `
            <h3>TOTAL: ${total}</h3>    
        `
    })


}


function recorrerArray(producto){
   
    divCarrito.innerHTML += `
    <div class="card" id="" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio Unitario: $${producto.precio}</p>
            <p class="card-text">Cantidad: ${producto.cantidad} u</p>
            <p class="card-text">Subtotal: $${producto.subTotal}</p>           
            <button class="btn btn-danger" id="eliminar${producto.nombre}">Eliminar</button>
        </div>
    </div>

    `
}


const procedimientoCompra = () =>{
    rubrosDisponibles();
    informarCompra();

}


inicializar();
procedimientoCompra();
