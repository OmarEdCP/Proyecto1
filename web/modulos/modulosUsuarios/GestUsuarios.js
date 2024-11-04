let obj = []; // arreglo que se llenará de objetos JSON
let indexProductosSeleccionados; // es el índice del arreglo
let path = "./DatosUsuario.json"; // Cambia la ruta a relativa

// Cargar datos desde el archivo JSON en la ruta relativa
fetch(path)
    .then((response) => {
        return response.json();
    })
    .then(function (jsondata) {
        obj = jsondata;
        console.log(obj);
        actualizaTabla();
    });

function validarCampos() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("txtNombre").value.trim();
    let contrasena = document.getElementById("txtContrasena").value.trim();
    let estatus = document.getElementById("txtEstatus").value.trim();
    // Verificar si algún campo está vacío
    if (!nombre || !contrasena || !estatus) {
        alert("Todos los campos son obligatorios. Por favor, completa todos los campos.");
        return false;
    }
    return true;
}

function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr onclick="selectProducto(' + obj.indexOf(elemento) + ');">' +
                '<td>' + obj.indexOf(elemento) + '</td>' +
                '<td>' + elemento.nomProd + '</td>' +
                '<td>' + elemento.contrasena + '</td>' +
                '<td>' + elemento.Estatus + '</td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

function selectProducto(index) {
    document.getElementById("txtNombre").value = obj[index].nomProd;
    document.getElementById("txtContrasena").value = obj[index].contrasena;
    document.getElementById("txtEstatus").value = obj[index].Estatus;
   
    indexProductosSeleccionados = index;
    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
}

function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtContrasena").value = "";
    document.getElementById("txtEstatus").value = "";

    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    document.getElementById("btnLimpiar").classList.add("disabled");
    document.getElementById("btnModificar").classList.add("disabled");
    indexProductosSeleccionados = 0;
}

function search() {
    let num_cols = 4;
    let input = document.getElementById("inputBusqueda");
    let filter = input.value.toUpperCase();
    let table_body = document.getElementById("tblProductos");
    let tr = table_body.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let display = "none";
        for (let j = 0; j < num_cols; j++) {
            let td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
        }
        tr[i].style.display = display;
    }
}

function agregarProducto() {
    if (!validarCampos()) return; 

    let nombre = document.getElementById("txtNombre").value;
    let estatus = document.getElementById("txtEstatus").value;
    let contrasena = document.getElementById("txtContrasena").value;

    let newProd = {
        nomProd: nombre,
        Estatus: estatus,
        contrasena: contrasena
    };

    obj.push(newProd);

    let jsonData = JSON.stringify(obj);
    console.log(jsonData);
    actualizaTabla();
    limpiar();
    document.getElementById("btnAgregar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.remove("disabled");
    document.getElementById("btnLimpiar").classList.remove("disabled");
    document.getElementById("btnModificar").classList.remove("disabled");
    indexProductosSeleccionados = 0;
}

function modificaProducto(index) {
    index = indexProductosSeleccionados;
    if (index !== undefined && index !== null) {
        let nombre = document.getElementById("txtNombre").value;
        let estatus = document.getElementById("txtEstatus").value;
        let contrasena = document.getElementById("txtContrasena").value;

        if (confirm("¿Desea cambiar el Usuario?")) {
            obj[index].nomProd = nombre;
            obj[index].contrasena = contrasena;
            obj[index].Estatus = estatus;
        } 
    }
    actualizaTabla();
    limpiar();
}

function eliminarProducto() {
    let index = indexProductosSeleccionados;
    console.log('Índice seleccionado:', index);
    
    if (index !== undefined && index !== null && index >= 0 && index < obj.length) {
        let producto = obj[index];
        
        console.log('Producto seleccionado:', producto);
        
        if (producto.Estatus.toLowerCase() === "desactivo") {
            if (confirm("¿Estás seguro de eliminar este producto?")) {
                obj.splice(index, 1);
            }
        } else {
            alert("Solo se puede eliminar productos con estatus 'desactivo'.");
        }
    } else {
        alert("Selecciona un producto antes de intentar eliminarlo.");
    }
    actualizaTabla();
    limpiar();
}
