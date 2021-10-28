const mongoose = require('mongoose');

const Titulacion = new mongoose.Schema({
    cod_asig: Number,
    cod_titulo: Number,
    profesor: Array,
    dificultad: AnalyserNode, // yo esto no lo pondria
    cred_asig: Number,
    nom_asig: String,
    curso: Number,
    cuatrimestre: Number,
    tip_asig: String,
    especial: Boolean,
});

module.exports = mongoose.model('Titulacion', Titulacion);