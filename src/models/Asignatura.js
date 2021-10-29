const mongoose = require('mongoose');

const Asignatura = new mongoose.Schema({
    cod_asig: Number,
    cod_titulo: Number,
    profesor: Array,
    dificultad: String, // yo esto no lo pondria | esto daba error AnalyserNode
    cred_asig: Number,
    nom_asig: String,
    curso: Number,
    cuatrimestre: Number,
    tip_asig: String,
    especial: Boolean,
});

module.exports = mongoose.model('Asignatura', Asignatura);