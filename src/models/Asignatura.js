const mongoose = require('mongoose');

const Titulacion = new mongoose.Schema({
    cod_titul: Number,
    cod_asig: Number,
    cred_asig: Number ,
    nom_asig: String,
    curso: Number,
    cuatrimestre: Number,
    tip_asig: String,
    especial: Boolean,
});

module.exports = mongoose.model('Titulacion', Titulacion);