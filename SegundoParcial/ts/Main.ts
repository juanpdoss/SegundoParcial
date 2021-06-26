class Main implements EventListenerObject
{
    public static vehiculos:Array<Vehiculo>;
 
    constructor() {
        Main.vehiculos=new Array<Vehiculo>();
        
    }

    handleEvent(ev:Event)
    {
        let botonPromedio=$("btnPromediar");
        botonPromedio.addEventListener("click",this.MostrarPromedio);

        let botonFiltrar=$("btnFiltrar");
        botonFiltrar.addEventListener("click",this.Filtrar);

       
        let btnClickeado=<HTMLElement>ev.target;
        let div=$("divAlta");
        div.hidden=false;

        let botonCerrar=$("btnCerrar");
        let botonAgregar=$("btnAgregar");

        botonCerrar.addEventListener("click",this.Cerrar);
        botonAgregar.addEventListener("click",this.Agregar);

       
       

    }

    MostrarPromedio()
    {
        if(Main.vehiculos.length== 0)
        {
             alert("el precio promedio es: " + 0);
        }
        else
        {
            let cantAutos=Main.vehiculos.length;
            const reducer = (accumulator:number, currentValue:Vehiculo) => accumulator + currentValue.precio;
            let promedio=Main.vehiculos.reduce(reducer,0)/cantAutos;      
            alert("el precio promedio es: " + promedio);
       
        }

       
    }

    Filtrar()
    {
        let tipoVehiculo = (<HTMLInputElement>document.getElementById("txtFiltrar")).value;

        if (tipoVehiculo == "Autos") {
            
            let filtrados = Main.vehiculos.filter(item=> item instanceof Auto);
            SettearTabla(filtrados);
            
        } else if(tipoVehiculo =="Camionetas"){
            
            let filtrados = Main.vehiculos.filter(item=> item instanceof Camioneta);
            SettearTabla(filtrados);
            
        }
        else
        {
            SettearTabla(Main.vehiculos);
        }

    }

  

    Agregar()
    {
        let id;
        if(Main.vehiculos.length == 0)
        {
            id = 1;
        }
        else
        {
            
            id = Main.vehiculos.reduce(function (max, item)
            {
                if(item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if(id == 0)
            {
                id + 1;
            }
        }

        let marca=$("txtMarca").value;
        let modelo=$("txtModelo").value;
        let precio=parseInt($("txtPrecio").value);
        let tipo=$("txtTipo").value;
        let es4x4=$("txt4x4").checked;

        if(tipo == "auto")
        {
            if(isNaN(id))
            {
                id=0;
            }
            if(isNaN(precio))
            {
                precio=0;
            }
            let auto:Auto=new Auto(id,marca,modelo,precio,4);
            
            GenerarFila(auto);
            AgregarVehiculo(auto);
            
        }
        else
        {
            let camioneta:Camioneta=new Camioneta(id,marca,modelo,precio,es4x4);
            
            GenerarFila(camioneta);
            AgregarVehiculo(camioneta);
            
        }       

      
    }

    Cerrar()
    {
        let div=$("divAlta");
        div.hidden=true;
    }

}

//no descifre porque si estas funciones eran metodos de main, rompia



function VaciarTabla()
{
    //no logre mantener el header de la tabla 
    let tabla=$("tabla");

    while(tabla.hasChildNodes())
    {
        tabla.removeChild(<Node>tabla.firstChild);
    }
  

}


function SettearTabla(vehiculos:Array<Vehiculo>)
{
    //alert("aaa");
    VaciarTabla();

    let cantidadVehiculos=vehiculos.length;

    for (let index = 0; index < cantidadVehiculos; index++) 
    {
        GenerarFila(vehiculos[index]);    
    }

}




function AgregarVehiculo(vehiculo:Vehiculo)
{
    Main.vehiculos.push(vehiculo); 
}


function GenerarFila(vehiculo:Vehiculo)
{
   
    //id marca modelo precio accion
    let tabla=$("tabla");

    let filaNueva=document.createElement("tr");

    let tdId=document.createElement("td");
    let tdMarca=document.createElement("td");
    let tdModelo=document.createElement("td");
    let tdPrecio=document.createElement("td");
    let tdAccion=document.createElement("td");

    let txtId=document.createTextNode(vehiculo.id.toString());
    tdId.appendChild(txtId);
    filaNueva.appendChild(tdId);

    let txtMarca=document.createTextNode(vehiculo.marca);
    tdMarca.appendChild(txtMarca);
    filaNueva.appendChild(tdMarca);

    let txtModelo=document.createTextNode(vehiculo.modelo);
    tdModelo.appendChild(txtModelo);
    filaNueva.appendChild(tdModelo);

    let txtPrecio=document.createTextNode(vehiculo.precio.toString());
    tdPrecio.appendChild(txtPrecio);
    filaNueva.appendChild(tdPrecio);

    let Ancla=document.createElement("a");
    let txtAncla=document.createTextNode("Eliminar");  
    Ancla.setAttribute("href","#");
    Ancla.addEventListener("click",EliminarFila);
    Ancla.appendChild(txtAncla);
    tdAccion.appendChild(Ancla);
    filaNueva.appendChild(tdAccion);
    

    tabla.appendChild(filaNueva);

}

function EliminarFila(ev:Event)
{
    let td = <HTMLTableCellElement>ev.target;
    let fila = <HTMLTableRowElement>td.parentNode?.parentNode;   
    let id= parseInt(<string>fila.childNodes.item(0).textContent);
    let vehiculos=Main.vehiculos.length;
  
    for(let i=0;i<vehiculos;i++) 
    {
        if(Main.vehiculos[i].id==id)
        {
            Main.vehiculos.splice(i,1);
            break;
        }
    }

    
    fila.remove();
}





window.addEventListener("load",()=>
{
    let main=new Main();
    let botonAlta=$("btnAlta");
    
   
    botonAlta.addEventListener("click",main);
    

});

//Funciones helpers
function $(id:string):HTMLInputElement
{
    return <HTMLInputElement>document.getElementById(id);
}



