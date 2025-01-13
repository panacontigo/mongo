const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_reserva: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  fecha_registro: { type: Date, default: Date.now },
  nombre: { type: String, required: true },
  ciudad_salida: { type: String, required: true },
  direcc_salida: { type: String, required: true },
  codpost_salida: { type: String, required: true },
  ciudad_llegada: { type: String, required: true },
  direcc_llegada: { type: String, required: true },
  codpost_llegada: { type: String, required: true },
  fecha_ida: { type: String, required: true },
  num_pasajeros: { type: String, required: true },
  num_maletas: { type: String, required: true },
  telefono: { type: String, required: true },
  precio: { type: String, required: true },
  status: { type: String, required: true }
  
}, {timestamps: true});

const User = mongoose.model('coleclientes', userSchema);

module.exports = User;

/*
id_reserva

nombre

ciudad_salida

direcc_salida

codpost_salida

ciudad_llegada

direcc_llegada

codpost_llegada

fecha_ida

num_pasajeros

num_maletas

telefono

email

fecha_registro

status

precio
*/