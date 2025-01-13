var tabla_contenedor = document.getElementById("tabla_resultado");


/*actualizacion jorge*/
var selectedIds = [];
var tabla_vista = null;
/**/


//// Variable JS btn para posteriormente escuchar la accion click
var btn = document.getElementById("btn");

///////    Accion del boton para EDITAR Registro llamada desde una funcion JavaScript  /////

function edit(id_btn_edit) {
    //var id_reserva = this.val();
    var id_reserva = $(id_btn_edit);
    var pregunta = confirm('¿Esta seguro de editar este registro?');
    //var PreparacionTexto = 'var1=' + 'Gustavo' + '&var2=' + 33 + '&var3=' + id_reserva;
    if (pregunta === true) {
        $.ajax({
            type: "POST",
            url: 'camb.php',
            data: {
                id_btn_edit: id_btn_edit
            }, //, var2: 27, var3: 'Ireland'},
            cache: false,
            dataType: 'html',
            success: function (data) {
                // document.write(data);
                //tabla_contenedor.insertAdjacentHTML('beforeend', data);
                tabla_contenedor.innerHTML = data;
                //alert('Registro ' + data +' eliminado');
            }
        });
    } else {
        return false;
    }
}

///////    Accion del boton para GUARDAR LOS CAMBIOS del Registro llamada desde una funcion JavaScript  /////

function camb(id_btn_camb) {
    //var id_reserva = this.val();
    var id_reserva = $(id_btn_camb);

    // Traer los valores contenidos en el formulario y guardarlos en variables JavaScript
    //var ciudad_salida = $("#ciudad_salida").val();
    var ciudad_llegada = $("#ciudad_llegada").val();
    var nombre = $("#nombre").val();
    var direcc_salida = $("#direcc_salida").val();
    var codpost_salida = $("#codpost_salida").val();
    var direcc_llegada = $("#direcc_llegada").val();
    var codpost_llegada = $("#codpost_llegada").val();
    var fecha_ida = $("#fecha_ida").val();
    var telefono = $("#telefono").val();
    var num_pasajeros = $("#num_pasajeros").val();
	var precio = $("#precio").val();

    // Contener toda la info y prepararla en una sola variable JavaScript para enviarla a PHP en estilo JSON
    var PreparacionInfo = 'id_btn_camb=' + id_btn_camb +
        //'ciudad_salida=' + ciudad_salida +
        '&ciudad_llegada=' + ciudad_llegada +
        '&nombre=' + nombre +
        '&direcc_salida=' + direcc_salida +
        '&codpost_salida=' + codpost_salida +
        '&direcc_llegada=' + direcc_llegada +
        '&codpost_llegada=' + codpost_llegada +
        '&fecha_ida=' + fecha_ida +
        '&telefono=' + telefono +
        '&num_pasajeros=' + num_pasajeros +
		'&precio=' + precio;

    var pregunta = confirm('¿Esta seguro de Guardar los cambios de este registro?');
    if (pregunta === true) {
        $.ajax({
            type: "POST",
            url: 'guardar.php',
            data: PreparacionInfo, //, var2: 27, var3: 'Ireland'},
            cache: false,
            dataType: 'html',
            success: function (data) {
                // document.write(data);
                //tabla_contenedor.insertAdjacentHTML('beforeend', data);
                //tabla_contenedor.innerHTML = data;
                alert('Registro ' + data + ' Guardado!');
            }
        });
    } else {
        return false;
    }
}

///////    Accion del boton para eliminar Registro llamada desde una funcion JavaScript  /////

function elim(id_btn_elim) {
    //var id_reserva = this.val();
    var id_reserva = $(id_btn_elim);
    var pregunta = confirm('¿Esta seguro de ELIMINAR este registro?');
    //var PreparacionTexto = 'var1=' + 'Gustavo' + '&var2=' + 33 + '&var3=' + id_reserva;
    if (pregunta === true) {
        $.ajax({
            type: "POST",
            url: 'd.php',
            data: {
                id_btn_elim: id_btn_elim
            }, //, var2: 27, var3: 'Ireland'},
            cache: false,
            dataType: 'html',
            success: function (data) {
                // document.write(data);
                //tabla_contenedor.insertAdjacentHTML('beforeend', data);
                tabla_contenedor.innerHTML = 'Registro ' + data + ' eliminado';
                alert('Registro ' + data + ' eliminado');
            }
        });
    } else {
        return false;
    }

}

/////// Accion del boton para NUEVO Registro llamada desde una funcion JavaScript  /////

function agregarNuevoRegistro() {
	/*
    $.ajax({
        type: "POST",
        url: 'nuev1.js',
        data: 0,
        cache: false,
        dataType: 'html',
        success: function (data) {
            // document.write(data);
            tabla_contenedor.innerHTML = data;
        },
		error: function(error) { console.log('Error:', error);
		}
    });
	*/
	//let data = `<iframe src="nuev1.html"></iframe>`;
	
	fetch('nuev1.txt')
    .then(response => response.text())
    .then(data => {
        //document.getElementById('contenido').textContent = data;	
		tabla_contenedor.innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
	
	//tabla_contenedor.innerHTML = data;

}

/////// Accion del boton para GUARDAR EL NUEVO Registro llamada desde una funcion JavaScript  /////

function GuardarNuevoRegistro() {
    //var id_reserva = this.val();
    //var id_reserva = $(id_btn_camb);

    // Traer los valosres contenidos en el formulario y guardarlos en variables JavaScript
    //var ciudad_salida = $("#ciudad_salida").val();

    var nombre = $("#nombre").val();
    var direcc_salida = $("#direcc_salida").val();
    var codpost_salida = $("#codpost_salida").val();
    var ciudad_llegada = $("#ciudad_llegada").val();
    var direcc_llegada = $("#direcc_llegada").val();
    var codpost_llegada = $("#codpost_llegada").val();
    var fecha_ida = $("#fecha_ida").val();
    var num_pasajeros = $("#num_pasajeros").val();
    var num_maletas = $("#num_maletas").val();
    var telefono = $("#telefono").val();
    var email = $("#email").val();
    var precio = $("#precio").val();

    // Contener toda la info y prepararla en una sola variable JavaScript para enviarla a PHP en estilo JSON
    var PreparacionInfo =
        //'id_btn_camb=' + id_btn_camb +
        //'ciudad_salida=' + ciudad_salida +
        'nombre=' + nombre +
        '&direcc_salida=' + direcc_salida +
        '&codpost_salida=' + codpost_salida +
        '&ciudad_llegada=' + ciudad_llegada +
        '&direcc_llegada=' + direcc_llegada +
        '&codpost_llegada=' + codpost_llegada +
        '&fecha_ida=' + fecha_ida +
        '&num_pasajeros=' + num_pasajeros +
        '&num_maletas=' + num_maletas +
        '&telefono=' + telefono +
        '&email=' + email +
        '&precio=' + precio;

    var pregunta = confirm('¿Esta seguro de Guardar este Nuevo registro?');
    if (pregunta === true) {
        $.ajax({
            type: "POST",
            url: 'nuev2.php',
            data: PreparacionInfo,
            cache: false,
            dataType: 'html',
            success: function (data) {
                // document.write(data);
                //tabla_contenedor.insertAdjacentHTML('beforeend', data);
                tabla_contenedor.innerHTML = data;
                alert('Registro ' + data);
            }
        });
    } else {
        return false;
    }
}

//// Accion del boton para BUSQUEDA POR FECHA llamada desde una funcion JavaScript  /////

function busq_fecha() {
    const fecha_ida = document.getElementById('fecha_ida').value;
    console.log(fecha_ida);
    tabla_contenedor.innerHTML = "<br>Loading...";

    let ejecutar = async () => {
        try {
            const response = await fetch('/api/users/indextest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fecha_ida: fecha_ida }) 
            });
            console.log(response);
            const clientes = await response.json();
            console.log(clientes);
	tabla_contenedor.innerHTML = `${clientes}`; 
        } catch (error) {
            console.error('Error fetching data:', error);
            tabla_contenedor.innerHTML = "An error occurred while fetching data.";
        }
    }
    ejecutar();
}

//// Accion del boton para BUSQUEDA POR FECHA ESTILO TABLA A llamada desde una funcion JavaScript  /////

function busq_fecha_b() {
	    const fecha_ida = document.getElementById('fecha_ida').value;
    console.log(fecha_ida);
    tabla_contenedor.innerHTML = "<br>Loading...";

    let ejecutar = async () => {
        try {
            const response = await fetch('/api/users/indexfechados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fecha_ida: fecha_ida }) 
            });
            console.log(response);
            const clientes = await response.json();
            console.log(clientes);
	tabla_contenedor.innerHTML = `${clientes}`; 
        } catch (error) {
            console.error('Error fetching data:', error);
            tabla_contenedor.innerHTML = "An error occurred while fetching data.";
        }
    }
    ejecutar();
}

// TRAE la tabla para seleccionar

async function traer_para_selec() {
    let nombre = document.getElementById('busq_nombre').value.trim();
    let url = '/api/users/index';
    let data = {};

    // Verificar si el campo de nombre no está vacío
    if (nombre) {
        url = '/api/users/index?nombre=' + encodeURIComponent(nombre);
    }

    let ejecutar = async () => {
        tabla_contenedor.innerHTML = "<br>Loading...";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const clientes = await response.json();

        // Create the table element
        let tabla01 = `Para usar los botones de Ver vista previa debe seleccionar al menos 1 o varios registros<br>
        <input type="button" name="selcbtn1" value="Ver vista previa Estilo Tabla A" onclick="selcfn()"/>
        <input type="button" name="selcbtn2" value="Ver vista previa Estilo Tabla B" onclick="selcfn2()"/>
        <br/>
        <div id="contenedorvistaprevia" >
        <table class="result">
            <tr class="bg-primary">
                <th>Selec</th>
                <th>Id</th>
                <th>Ciudad llegada</th>
                <th>Nombre</th>
                <th>Direcc Salida</th>
                <th>CodP Salida</th>  
                <th>Direcc llegada</th>  
                <th>CodP llegada</th>
                <th>fecha ida</th>  
                <th>Telefono</th>  
                <th>Nro. de Pasajeros</th>
                <th>Precio</th>
                <th>Opciones</th>
            </tr>`;

        // Create table rows for each client
        clientes.forEach(cliente => {
            tabla01 += `<tr style="text-align:center">
                <td><input type="checkbox" name="selecbox" id="selecboxid" value="${cliente._id}" onchange="actualizarEstadoBoton()"></td>
                <td>${cliente.id_reserva}</td>
                <td>${cliente.ciudad_llegada}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.direcc_salida}</td>
                <td>${cliente.codpost_salida}</td>
                <td>${cliente.direcc_llegada}</td>
                <td>${cliente.codpost_llegada}</td>
                <td>${cliente.fecha_ida}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.num_pasajeros}</td>
                <td>${cliente.precio}$</td>
                <td><button type="button" onclick="elim(${cliente._id})">X</button>
                    <button type="button" onclick="edit(${cliente._id})">EDIT</button>
                </td>
            </tr>`;
        });
        // Append the table to the div

        tabla01 += `</table></div>`;
        tabla_contenedor.innerHTML = tabla01;
        
      // 
    };
    selectedIds =[];
    await ejecutar();
    actualizarEstadoBoton();
    tabla_vista = document.getElementById("contenedorvistaprevia");
}
////// Luego de seleccionar, aqui envia los registros seleccionados con el checkbox y muestra solamente los registros que fueron seleccionados
function selcfn() {
   
    let data = {
        selectedIds: selectedIds
    };

    let ejecutar = async () => {
        try {
            const response = await fetch('/api/users/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const clientes = await response.json();

            // Create the table element
            let tabla01 = `
            <table class="result">
                <tr class="bg-primary">
                  
                    <th>Id</th>
                    <th>Ciudad llegada</th>
                    <th>Nombre</th>
                    <th>Direcc Salida</th>
                    <th>CodP Salida</th>  
                    <th>Direcc llegada</th>  
                    <th>CodP llegada</th>
                    <th>fecha ida</th>  
                    <th>Telefono</th>  
                    <th>Nro. de Pasajeros</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>`;

            // Create table rows for each client
            clientes.forEach(cliente => {
                tabla01 += `<tr style="text-align:center">
                    <td>${cliente.id_reserva}</td>
                    <td>${cliente.ciudad_llegada}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.direcc_salida}</td>
                    <td>${cliente.codpost_salida}</td>
                    <td>${cliente.direcc_llegada}</td>
                    <td>${cliente.codpost_llegada}</td>
                    <td>${cliente.fecha_ida}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.num_pasajeros}</td>
                    <td>${cliente.precio}$</td>
                    <td><button type="button" onclick="elim(${cliente._id})">X</button>
                        <button type="button" onclick="edit(${cliente._id})">EDIT</button>
                    </td>
                 </tr>`;
            });
            // Append the table to the div

            tabla01 += `</table>`;
        
          
            tabla_vista.innerHTML = tabla01;
            // Actualizar estado del botón después de renderizar la tabla
           // actualizarEstadoBoton();

        } catch (error) {
            console.error('Error fetching data:', error);
            tabla_vista.innerHTML = "An error occurred while fetching data.";
        }
    };
    ejecutar();
}

function selcfn2() {
 
    let data = {
        selectedIds: selectedIds
    };

    let ejecutar = async () => {
        try {
            const response = await fetch('/api/users/filterbycity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();


         console.log(JSON.stringify(result));
            // Procesar y mostrar los resultados
            let tablaOrlando = `
            <table class="result">
                <tr class="bg-primary">
                    <th>Id</th>
                    <th>Ciudad llegada</th>
                    <th>Nombre</th>
                    <th>Direcc Salida</th>
                    <th>CodP Salida</th>  
                    <th>Direcc llegada</th>  
                    <th>CodP llegada</th>
                    <th>fecha ida</th>  
                    <th>Telefono</th>  
                    <th>Nro. de Pasajeros</th>
                    <th>Precio</th>
                </tr>`;

            result.orlando.forEach(cliente => {
                tablaOrlando += `<tr style="text-align:center">
                    <td>${cliente.id_reserva}</td>
                    <td>${cliente.ciudad_llegada}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.direcc_salida}</td>
                    <td>${cliente.codpost_salida}</td>
                    <td>${cliente.direcc_llegada}</td>
                    <td>${cliente.codpost_llegada}</td>
                    <td>${cliente.fecha_ida}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.num_pasajeros}</td>
                    <td>${cliente.precio}$</td>
                </tr>`;
            });

            tablaOrlando += `</table>`;
            
            let tablaMiami = `
            <table class="result">
                <tr class="bg-primary">
                    <th>Id</th>
                    <th>Ciudad llegada</th>
                    <th>Nombre</th>
                    <th>Direcc Salida</th>
                    <th>CodP Salida</th>  
                    <th>Direcc llegada</th>  
                    <th>CodP llegada</th>
                    <th>fecha ida</th>  
                    <th>Telefono</th>  
                    <th>Nro. de Pasajeros</th>
                    <th>Precio</th>
                </tr>`;

            result.miami.forEach(cliente => {
                tablaMiami += `<tr style="text-align:center">
                    <td>${cliente.id_reserva}</td>
                    <td>${cliente.ciudad_llegada}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.direcc_salida}</td>
                    <td>${cliente.codpost_salida}</td>
                    <td>${cliente.direcc_llegada}</td>
                    <td>${cliente.codpost_llegada}</td>
                    <td>${cliente.fecha_ida}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.num_pasajeros}</td>
                    <td>${cliente.precio}$</td>
                </tr>`;
            });

            tablaMiami += `</table>`;

            tabla_vista.innerHTML = `<h3>De Orlando a Miami AM (Control ciudad de llegada: Miami)</h3>${tablaOrlando}<h3>De Miami a Orlando PM (Control ciudad de llegada: Orlando)</h3>${tablaMiami}`;

        } catch (error) {
            console.error('Error fetching data:', error);
            tabla_vista.innerHTML = "An error occurred while fetching data.";
        }
    };
    ejecutar();
}


//// Accion para el boton de busqueda de registros escuchando la accion del boton  /////
btn.addEventListener("click", function () {
    var textobuscado = $("#textobuscado").val();
    var PreparacionTexto = 'var1=' + 'Gustavo' + '&var2=' + 33 + '&var3=' + textobuscado;
    $.ajax({
        type: "POST",
        url: 'temp.php',
        data: PreparacionTexto,
        cache: false,
        dataType: 'html',
        success: function (data) {
            // document.write(data);
            //tabla_contenedor.insertAdjacentHTML('beforeend', data);
            tabla_contenedor.innerHTML = data;
        }
    })
})

//// Accion del boton para BUSQUEDA POR NOMBRE llamada desde una funcion JavaScript  /////

function busq_nombre() {
    var busq_nombre = $("#busq_nombre").val();
    //var PreparacionTexto = 'var1=' + 'Gustavo' + '&var2=' + 33 + '&var3=' + busq_fecha;
    $.ajax({
        type: "POST",
        url: 'consult_nom.php',
        data: {
            busq_nombre: busq_nombre
        },
        cache: false,
        dataType: 'html',
        success: function (data) {
            // document.write(data);
            tabla_contenedor.innerHTML = data;
        }
    });

}

/*funciones greagadas*/

function actualizarEstadoBoton() {
    
    const checkboxes = document.querySelectorAll("input[name='selecbox']");
    const botonVistaPreviaA = document.querySelector("input[name='selcbtn1']");
    const botonVistaPreviaB = document.querySelector("input[name='selcbtn2']");
    let algunoSeleccionado = false;

   // selectedIds = []; // Reset the global array

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            algunoSeleccionado = true;
            selectedIds.push(checkbox.value); // Add the selected ID to the global array
        }
    });

    botonVistaPreviaA.disabled = !algunoSeleccionado;
    botonVistaPreviaB.disabled = !algunoSeleccionado;
}