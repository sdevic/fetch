let clientes = document.querySelector("#clientes")
let productos = document.querySelector("#productos")
let valor = document.querySelector("#valor")
//Creo las variables para poder guardar los datos de carga
let cliente;
let producto;
let precio;
let facturas=[];
//creo un array, el primer item va a ser cero, lo hice para poder asignarles a futuro numero a la factura con el length pero estimo que lo voy a borrar y se lo voy a asignar con length +1, tambien le voy a crear mas objetos para poder usarlos como estadistica.


//Creo un constructor para poder guardar mis facturas en un objeto
class Factura {
    constructor(cliente, producto, precio) {
        this.cliente = cliente;
        this.producto = producto;
        this.precio = precio;
    }
}


//************************* Eventos ****************

// ME lleva a la carga de factura nueva
let seleccionarFac = document.querySelector("#btnFac");
seleccionarFac.addEventListener("click", cargarFactura);

//Me lleva a la carga de clientes(en esta entrega no la usamos)
let seleccionar = document.querySelector("#btnCli");
seleccionar.addEventListener("click", cargarClientes);

// En este evento creo un nuevo objeto(factur) lo empujo al array y lo dejo en el storage guardado
const factura = document.querySelector('#cargaFactura');
factura.addEventListener("submit", (e) => {
    e.preventDefault();
    // Si los campos no estan cargados por completo y hago guardar me envia mensaje, pero me llena el primer imput con true y no quiero que me modifique lo ya cargado.
    if(clientes.value == "" || productos.value == ""  ||  valor.value == ""){
        Swal.fire('Los datos cargados no estan completos');
        
    }else{
        cliente = clientes.value;
        producto = productos.value;
        precio = valor.value;
        let nFactura = new Factura(cliente, producto, precio);
        facturas.push(nFactura);
        localStorage.setItem("facturas", JSON.stringify(facturas));
        mostrarFacturaCargada();
    }
})

//Este evento retorna a la carga de factura
let volverFactura = document.querySelector('#verFactura');
volverFactura.addEventListener("submit", (e) => {
    e.preventDefault();
    cargarFactura();
})






//Creo una funcion para cargar la factura 
function cargarFactura() {
    clientes.value = "";
    productos.value = "";
    valor.value = "";
    document.getElementById("nuevaFactura").style.display = "block";
    document.getElementById("facturaGenerada").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "none";
}




//muestra la factura cargada una vez apretado el boton y sin poder editar, lo hice con otro formulario por el roor del storage, despues voy a usar el mismo formulario para todo
function mostrarFacturaCargada() {
    document.getElementById("facturaGenerada").style.display = "block";
    document.getElementById("nuevaFactura").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "none";
    const nCliente = document.querySelector('#clientesFac');
    nCliente.value = cliente;
    const nProducto = document.querySelector('#productosFac');
    nProducto.value = producto;
    const nPrecio = document.querySelector('#valorFac');
    nPrecio.value = precio;
}


// Muestro el formulario cliente, por ahora sin uso
function cargarClientes() {
    document.getElementById("facturaGenerada").style.display = "none";
    document.getElementById("nuevaFactura").style.display = "none";
    document.getElementById("nuevoCliente").style.display = "block";
}

const cont = document.querySelector("#contenedor");
const facturasCargadas =  ()=>{
    fetch("./datos.json")
   .then(response => response.json())
   .then(result =>  {
        result.forEach(fact => {
            
            facturas.push(fact);
            
   })
})
}

facturasCargadas();