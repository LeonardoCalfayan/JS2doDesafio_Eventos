
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
                    <button class="btn btn-secondary" id="${productosDisponibles.nombre}">Comprar</button>
                </div>
            </div>
       `           
       divProductos.addEventListener('click',(e) =>{
        if(e.target && e.target.id === productosDisponibles.nombre){
           
           console.log(e.target.id)
            //productosDisponibles(nombreRubros.nombre)
        
           }
       }) 
    
    }

}



// const productosDisponibles = (rubroElegido) =>{
//     let arregloProductosDisponibles = (arrayProductos.filter((producto) => producto.rubro === rubroElegido.nombre))
//     let productoID
//     do{
//         let mostrarProductos = "";
//         for(let productosDisponibles of arregloProductosDisponibles){
//             mostrarProductos += (productosDisponibles.id + " " + productosDisponibles.nombre + " $" + productosDisponibles.precio + " c/u\n")
//         }
        
//     //    productoID = parseInt(prompt("Ingresá el número del producto que vas a elegir por favor:\n" + mostrarProductos))

//     }while(isNaN(productoID) || productoID <= 0 || productoID > arregloProductosDisponibles.length)

// //   return(arregloProductosDisponibles.find((producto => producto.id === productoID)))

// }



const solicitarCantidad = (productoElegido) => {    
    
    let cantidad;
    do{
  //      cantidad = parseInt(prompt("Ingresá la cantidad que vas a llevar por favor: (máximo 12 unidades)"));

    }while(isNaN(cantidad) || cantidad < 1 || cantidad > 12)
    
    productoElegido.cantidad = cantidad;
    productoElegido.subtotalProducto();

    arrayCarrito.push(productoElegido);

}

const informarCompra = () =>{

    texto = "Estás llevando:\n";
 //   let seguir = confirm("Desea agregar otro producto?")
    
    if(seguir === true){

        procedimientoCompra();
    
    }else{
        divProductos.innerHTML = "<h3>Tu pedido es:<br></h3>"
        arrayCarrito.forEach(recorrerArray);
        total  = arrayCarrito.reduce((total, producto) => total + producto.subTotal, 0);
        texto += `\nTotal: ${total}` 
    //    alert(texto);       
    }
}

function recorrerArray(producto){
    texto +=  producto.cantidad + " " + producto.nombre + " Subtotal: " + producto.subTotal + "\n";
    divProductos.innerHTML += `
        <h4 class="card-title">${producto.nombre}</h4><br>
        <p class="card-text">Precio Unitario: $${producto.precio}</p><br>
        <p class="card-text">Cantidad: ${producto.cantidad} u</p><br>
        <p class="card-text">Subtotal: $${producto.subTotal}</p><br><br>
        `

}
const confirmarCompra = () =>{

 //   let confirmar = confirm("Desea quitar algún producto de la lista?")
    
    if(confirmar){
        console.log(arrayCarrito);
        texto = "";
        arrayCarrito.forEach(mostrarCarrito);
        let idEliminar;
        do{
//            idEliminar = parseInt(prompt("Ingresá el número de producto que querés eliminar\n" + texto));
            console.log(idEliminar)
        }while(isNaN(idEliminar) || idEliminar < 0 || idEliminar >= arrayCarrito.length)
        arrayCarrito = arrayCarrito.filter((producto,indice) => indice != idEliminar)
        console.log(arrayCarrito)
    }

    informarCompra();
}

function mostrarCarrito(producto, indice){
    texto += "Número: "+ indice + "\n " + producto.cantidad + " " + producto.nombre + " Subtotal: " + producto.subTotal + "\n"; 
}

const cobrarProductos = () =>{
    let monto = 0;
    
    do{
    //    monto = parseInt(prompt("Con cuanto abonás?"));
    }while(isNaN(monto))
    
    if(monto > total){
   //     alert("Tu vuelto es $"+(monto - total)+"\nGracias por tu compra!")
    }else if(monto === total){
     //   alert("Gracias por tu compra!")
    }else{
   //     alert("Te faltarían $"+(total-monto))
    }   
}


const procedimientoCompra = () =>{
    let rubroElegido = rubrosDisponibles();
//    let productoElegido = productosDisponibles(rubroElegido);
//    solicitarCantidad(productoElegido);
//    informarCompra();

}


inicializar();
procedimientoCompra();
//confirmarCompra();
//cobrarProductos();