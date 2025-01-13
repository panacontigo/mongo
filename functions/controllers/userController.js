//const ejs = require('ejs');
const path = require('path');
const User = require('../models/user');


/*
exports.index = async (event) => {
  try {
    const users = await User.find().sort({ _id: -1 }).limit(15);
    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};*/
exports.index = async (event) => {
  try {
    const query = {};
    const nombre = event.queryStringParameters?.nombre;

    if (nombre) {
      query.nombre = { $regex: nombre, $options: 'i' }; // Filtrar por nombre, insensible a mayúsculas/minúsculas
    }

    const users = await User.find(query).sort({ _id: -1 }).limit(15);
    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};



exports.filter = async (event) => {
  try {
    const { selectedIds } = JSON.parse(event.body);

    if (!selectedIds || !Array.isArray(selectedIds) || selectedIds.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No se han proporcionado IDs válidos' })
      };
    }

    const users = await User.find({ _id: { $in: selectedIds } }).sort({ _id: -1 }).limit(15);

    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
exports.filterbycity = async (event) => {
  try {
    const { selectedIds } = JSON.parse(event.body);

    if (!selectedIds || !Array.isArray(selectedIds) || selectedIds.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No se han proporcionado IDs válidos' })
      };
    }

    const orlandoUsers = await User.find({ _id: { $in: selectedIds }, ciudad_salida: 'Orlando' }).sort({ _id: -1 });
    const miamiUsers = await User.find({ _id: { $in: selectedIds }, ciudad_salida: 'Miami' }).sort({ _id: -1 });

    return {
      statusCode: 200,
      body: JSON.stringify({
        orlando: orlandoUsers,
        miami: miamiUsers
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.create = async (event) => {
  try {

    // Si es POST, procesar los datos
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      const user = new User(data);
      await user.save();
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: 'Usuario creado exitosamente',
          user 
        })
      };
    }

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};


// Obtener los últimos 10 usuarios ESTE SCRIPT SE EJECUTA EN EL ARCHIVO DE PRUEBAS LISTADO.HTML
exports.indextestabla = async (event) => {
  try {
    const page = parseInt(event.queryStringParameters.page) || 1;
    const limit = 10; // Número de registros por página
    const skip = (page - 1) * limit;

    // Obtener parámetros de filtro de fecha
    const startDate = event.queryStringParameters.startDate ? new Date(event.queryStringParameters.startDate) : null;
    const endDate = event.queryStringParameters.endDate ? new Date(event.queryStringParameters.endDate) : null;

    // Construir el filtro de fecha
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = { fecha: { $gte: startDate, $lte: endDate } };
    } else if (startDate) {
      dateFilter = { fecha: { $gte: startDate } };
    } else if (endDate) {
      dateFilter = { fecha: { $lte: endDate } };
    }

    // Obtener usuarios con paginación y filtro de fecha
    const users = await User.find(dateFilter).sort({ _id: -1 }).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(dateFilter);

    return {
      statusCode: 200,
      body: JSON.stringify({
        users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.indexfecha = async (event) => {

  try {
    const users = await User.find( {ciudad_llegada: "Orlando" /*, fecha_ida: new Date("2017-06-18")*/ } ).sort({ _id: -1 }).limit(15);

    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.indextestbk01 = async (event) => {

  try {
	//Aqui escribimos la consualta a la base de datos a mongodb
    const users = await User.find( {ciudad_llegada: "Orlando" , fecha_ida: "2017-06-18" } ).sort({ _id: -1 }).limit(15);
	
	//aqui prepararamos nuestras vistas procesadas y renderizadas desde el servidor nodejs
	
	      // Create the table element
    let tabla01 = `Para usar los botones de Ver vista previa debe seleccionar al menos 1 o varios registros<br>
	<input type="button" name="selcbtn" value="Ver vista previa Estilo Tabla A" onclick="selcfn()"/>
	<input type="button" name="selcbtn" value="Ver vista previa Estilo Tabla B" onclick="selcfn2()"/>
	<br/>
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
      
		users.forEach(users => {
		tabla01 += `<tr style="text-align:center">
		    <td><input type="checkbox" name="selecbox" id="selecboxid" value="${users._id}"></td>
			<td>${users.id_reserva}</td>
			<td>${users.ciudad_llegada}</td>
			<td>${users.nombre}</td>
			<td>${users.direcc_salida}</td>
			<td>${users.codpost_salida}</td>
			<td>${users.direcc_llegada}</td>
			<td>${users.codpost_llegada}</td>
			<td>${users.fecha_ida}</td>
			<td>${users.telefono}</td>
			<td>${users.num_pasajeros}</td>
			<td>${users.precio}$</td>
			<td><button type="button" onclick="elim(${users._id})">X</button>
				<button type="button" onclick="edit(${users._id})">EDIT</button>
			</td>
		 </tr>`

		});
		// Append the table to the div

	tabla01 += `</table>`;
	//tabla_contenedor.innerHTML = tabla01;
	
// Aqui preparamos la salida hacia el frontend HTML y la enviamos
    return {
      statusCode: 200,
      body: JSON.stringify(tabla01)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.indextestbk02 = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      try {
        const data = JSON.parse(event.body); 
        // Add input validation here (e.g., check for required fields, data types)

        // Uncomment and implement the following lines
        // const user = new User(data);
        // await user.find(); 

        // Filter out or mask sensitive data before returning
        const filteredData = data; 

        return {
          statusCode: 200, // Changed to 200 OK
          body: JSON.stringify(filteredData) 
        };
      } catch (jsonParseError) {
        return {
          statusCode: 400, // Bad Request
          body: JSON.stringify({ error: 'Invalid JSON request body' })
        };
      }
    } else {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.indexfechados = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      try {
		// Traemos los datos del formulario HTML en este caso del input fecha
        const data = JSON.parse(event.body); 

        // Filter out or mask sensitive data before returning
        const filteredData = data.fecha_ida;
        // Add input validation here (e.g., check for required fields, data types)

		//Aqui escribimos la consulta a la base de datos a mongodb
	  const consultamdb = await User.find( { fecha_ida: filteredData } ).sort({ _id: -1 }).limit(15);
	  	//aqui prepararamos nuestras vistas procesadas y renderizadas desde el servidor nodejs
	
	      // Create the table element
    let tabla01 = `Para usar los botones de Ver vista previa debe seleccionar al menos 1 o varios registros<br>
	<input type="button" name="selcbtn" value="Ver vista previa Estilo Tabla A" onclick="selcfn()"/>
	<input type="button" name="selcbtn" value="Ver vista previa Estilo Tabla B" onclick="selcfn2()"/>
	<br/>
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
      
		consultamdb.forEach(consultamdb => {
		tabla01 += `<tr style="text-align:center">
		    <td><input type="checkbox" name="selecbox" id="selecboxid" value="${consultamdb._id}"></td>
			<td>${consultamdb.id_reserva}</td>
			<td>${consultamdb.ciudad_llegada}</td>
			<td>${consultamdb.nombre}</td>
			<td>${consultamdb.direcc_salida}</td>
			<td>${consultamdb.codpost_salida}</td>
			<td>${consultamdb.direcc_llegada}</td>
			<td>${consultamdb.codpost_llegada}</td>
			<td>${consultamdb.fecha_ida}</td>
			<td>${consultamdb.telefono}</td>
			<td>${consultamdb.num_pasajeros}</td>
			<td>${consultamdb.precio}$</td>
			<td><button type="button" onclick="elim(${consultamdb._id})">X</button>
				<button type="button" onclick="edit(${consultamdb._id})">EDIT</button>
			</td>
		 </tr>`

		});
		// Append the table to the div

	tabla01 += `</table>`;
	//tabla_contenedor.innerHTML = tabla01;

        // Uncomment and implement the following lines
        // const user = new User(data);
        // await user.find(); 
        return {
          statusCode: 200, // Changed to 200 OK
          body: JSON.stringify(tabla01) 
        };
      } catch (jsonParseError) {
        return {
          statusCode: 400, // Bad Request
          body: JSON.stringify({ error: 'Invalid JSON request body' })
        };
      }
    } else {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({ error: error.message })
    };
  }
};

exports.indextest = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      try {
		// Traemos los datos del formulario HTML en este caso del input fecha
        const data = JSON.parse(event.body); 

        // Filter out or mask sensitive data before returning
        const filteredData = data.fecha_ida;
        // Add input validation here (e.g., check for required fields, data types)

		//Aqui escribimos la consulta a la base de datos a mongodb
	  //const consultamdb = await User.find( { fecha_ida: filteredData } ).sort({ _id: -1 }).limit(0);
	  const queryA = await User.find({ fecha_ida: filteredData, ciudad_llegada: 'Miami' }).sort({ id_reserva: 1 }).limit(0);
	  	//aqui prepararamos nuestras vistas procesadas y renderizadas desde el servidor nodejs
	
	      // Create the table element
    let registrocompletoA = '';
    let tituloA = '';

    queryA.forEach(user => {
      const calculo1 = user.precio * user.num_pasajeros;
      registrocompletoA += `
        <tr>
          <td>${user.nombre}</td>
          <td>${user.telefono}</td>
          <td>${user.direcc_salida}</td>
          <td>${user.codpost_salida}</td>
          <td>${user.direcc_llegada}</td>
          <td>${user.codpost_llegada}</td>
          <td>${user.num_pasajeros}</td>
          <td>$ ${user.precio}</td>
          <td>$ ${calculo1}</td>
        </tr>`;
    });

    tituloA = `
      <br><table border="1" cellspacing="0" class="para_imprimir">
      <tr>
        <td colspan="9"><center><strong>Fecha: ${filteredData}<br />
          De Orlando a Miami AM (Control ciudad de llegada: Miami)</strong></center></td>
      </tr>
      <tr>
        <td><strong>Nombre</strong></td>
        <td><strong>Telefono</strong></td>
        <td><strong>Direccion de Salida </strong></td>
        <td><strong>CodP Salida</strong></td>
        <td><strong>Direccion Llegada </strong></td>
        <td><strong>CodP Llegada</strong></td>
        <td><strong># de Pasajeros </strong></td>
        <td><strong>Valor</strong></td>
        <td><strong>Valor Total </strong></td>
      </tr>`;

    const queryB = await User.find({ fecha_ida: filteredData, ciudad_llegada: 'Orlando' }).sort({ id_reserva: 1 });
    let registrocompletoB = '';
    let tituloB = '';

    queryB.forEach(user => {
      const calculo1 = user.precio * user.num_pasajeros;
      registrocompletoB += `
        <tr>
          <td>${user.nombre}</td>
          <td>${user.telefono}</td>
          <td>${user.direcc_salida}</td>
          <td>${user.codpost_salida}</td>
          <td>${user.direcc_llegada}</td>
          <td>${user.codpost_llegada}</td>
          <td>${user.num_pasajeros}</td>
          <td>$ ${user.precio}</td>
          <td>$ ${calculo1}</td>
        </tr>`;
    });

    tituloB = `
      <table border="1" cellspacing="0" class="para_imprimir">
      <tr>
        <td colspan="9"><center><strong>De Miami a Orlando PM <br>(Control ciudad de llegada: Orlando)</strong></center></td>
      </tr>
      <tr>
        <td><strong>Nombre</strong></td>
        <td><strong>Telefono</strong></td>
        <td><strong>Direccion de Salida </strong></td>
        <td><strong>CodP Salida</strong></td>
        <td><strong>Direccion Llegada </strong></td>
        <td><strong>CodP Llegada</strong></td>
        <td><strong># de Pasajeros </strong></td>
        <td><strong>Valor</strong></td>
        <td><strong>Valor Total </strong></td>
      </tr>`;
	  
	  const salidahtml = `${tituloA}${registrocompletoA}</table><br>${tituloB}${registrocompletoB}</table><br><button type="button" onclick="imprimir()">Imprimir</button>`;
	//tabla_contenedor.innerHTML = tabla01;

        // Uncomment and implement the following lines
        // const user = new User(data);
        // await user.find(); 
        return {
          statusCode: 200, // Changed to 200 OK
          body: JSON.stringify(salidahtml) 
        };
      } catch (jsonParseError) {
        return {
          statusCode: 400, // Bad Request
          body: JSON.stringify({ error: 'Invalid JSON request body' })
        };
      }
    } else {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({ error: error.message })
    };
  }
};