"use strict";
var Main = /** @class */ (function () {
    function Main() {
        Main.vehiculos = new Array();
    }
    Main.prototype.handleEvent = function (ev) {
        var botonPromedio = $("btnPromediar");
        botonPromedio.addEventListener("click", this.MostrarPromedio);
        var botonFiltrar = $("btnFiltrar");
        botonFiltrar.addEventListener("click", this.Filtrar);
        var btnClickeado = ev.target;
        var div = $("divAlta");
        div.hidden = false;
        var botonCerrar = $("btnCerrar");
        var botonAgregar = $("btnAgregar");
        botonCerrar.addEventListener("click", this.Cerrar);
        botonAgregar.addEventListener("click", this.Agregar);
    };
    Main.prototype.MostrarPromedio = function () {
        if (Main.vehiculos.length == 0) {
            alert("el precio promedio es: " + 0);
        }
        else {
            var cantAutos = Main.vehiculos.length;
            var reducer = function (accumulator, currentValue) { return accumulator + currentValue.precio; };
            var promedio = Main.vehiculos.reduce(reducer, 0) / cantAutos;
            alert("el precio promedio es: " + promedio);
        }
    };
    Main.prototype.Filtrar = function () {
        var tipoVehiculo = document.getElementById("txtFiltrar").value;
        if (tipoVehiculo == "Autos") {
            var filtrados = Main.vehiculos.filter(function (item) { return item instanceof Auto; });
            SettearTabla(filtrados);
        }
        else if (tipoVehiculo == "Camionetas") {
            var filtrados = Main.vehiculos.filter(function (item) { return item instanceof Camioneta; });
            SettearTabla(filtrados);
        }
        else {
            SettearTabla(Main.vehiculos);
        }
    };
    Main.prototype.Agregar = function () {
        var id;
        if (Main.vehiculos.length == 0) {
            id = 1;
        }
        else {
            id = Main.vehiculos.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        var marca = $("txtMarca").value;
        var modelo = $("txtModelo").value;
        var precio = parseInt($("txtPrecio").value);
        var tipo = $("txtTipo").value;
        var es4x4 = $("txt4x4").checked;
        if (tipo == "auto") {
            if (isNaN(id)) {
                id = 0;
            }
            if (isNaN(precio)) {
                precio = 0;
            }
            var auto = new Auto(id, marca, modelo, precio, 4);
            GenerarFila(auto);
            AgregarVehiculo(auto);
        }
        else {
            var camioneta = new Camioneta(id, marca, modelo, precio, es4x4);
            GenerarFila(camioneta);
            AgregarVehiculo(camioneta);
        }
    };
    Main.prototype.Cerrar = function () {
        var div = $("divAlta");
        div.hidden = true;
    };
    return Main;
}());
//no descifre porque si estas funciones eran metodos de main, rompia
function VaciarTabla() {
    //no logre mantener el header de la tabla 
    var tabla = $("tabla");
    while (tabla.hasChildNodes()) {
        tabla.removeChild(tabla.firstChild);
    }
}
function SettearTabla(vehiculos) {
    //alert("aaa");
    VaciarTabla();
    var cantidadVehiculos = vehiculos.length;
    for (var index = 0; index < cantidadVehiculos; index++) {
        GenerarFila(vehiculos[index]);
    }
}
function AgregarVehiculo(vehiculo) {
    Main.vehiculos.push(vehiculo);
}
function GenerarFila(vehiculo) {
    //id marca modelo precio accion
    var tabla = $("tabla");
    var filaNueva = document.createElement("tr");
    var tdId = document.createElement("td");
    var tdMarca = document.createElement("td");
    var tdModelo = document.createElement("td");
    var tdPrecio = document.createElement("td");
    var tdAccion = document.createElement("td");
    var txtId = document.createTextNode(vehiculo.id.toString());
    tdId.appendChild(txtId);
    filaNueva.appendChild(tdId);
    var txtMarca = document.createTextNode(vehiculo.marca);
    tdMarca.appendChild(txtMarca);
    filaNueva.appendChild(tdMarca);
    var txtModelo = document.createTextNode(vehiculo.modelo);
    tdModelo.appendChild(txtModelo);
    filaNueva.appendChild(tdModelo);
    var txtPrecio = document.createTextNode(vehiculo.precio.toString());
    tdPrecio.appendChild(txtPrecio);
    filaNueva.appendChild(tdPrecio);
    var Ancla = document.createElement("a");
    var txtAncla = document.createTextNode("Eliminar");
    Ancla.setAttribute("href", "#");
    Ancla.addEventListener("click", EliminarFila);
    Ancla.appendChild(txtAncla);
    tdAccion.appendChild(Ancla);
    filaNueva.appendChild(tdAccion);
    tabla.appendChild(filaNueva);
}
function EliminarFila(ev) {
    var _a;
    var td = ev.target;
    var fila = (_a = td.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
    var id = parseInt(fila.childNodes.item(0).textContent);
    var vehiculos = Main.vehiculos.length;
    for (var i = 0; i < vehiculos; i++) {
        if (Main.vehiculos[i].id == id) {
            Main.vehiculos.splice(i, 1);
            break;
        }
    }
    fila.remove();
}
window.addEventListener("load", function () {
    var main = new Main();
    var botonAlta = $("btnAlta");
    botonAlta.addEventListener("click", main);
});
//Funciones helpers
function $(id) {
    return document.getElementById(id);
}
