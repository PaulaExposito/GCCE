const mongoose = require('mongoose');

const ServiciosExternos = new mongoose.Schema({
    cod_alumno: Number,
    trabaja: Boolean,
    sueldo: Number
});

module.exports = mongoose.model('ServiciosExternos', ServiciosExternos);