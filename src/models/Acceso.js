const mongoose = require('mongoose');

const Acceso = new mongoose.Schema({
    cod_alu: Number,
    tipo_acceso: String,
    nota_acceso: Number,
    nota_med_bas: Number,
    nota_med_esp: Number,
    nota_bach: Number,
});

module.exports = mongoose.model('Acceso', Acceso);