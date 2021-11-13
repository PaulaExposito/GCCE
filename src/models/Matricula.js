const mongoose = require('mongoose');

const Matricula = new mongoose.Schema({
    cod_matricula: Number,
    cod_alumno: Number,
    cred_aprobados: Number,
    cred_matriculados: Number,
    year: String,
    poat: Boolean,
    nuevo_ingreso: Boolean,
    coste_credito: Number,
    beca: Boolean,
    cancela_matricula: Boolean
});

module.exports = mongoose.model('Matricula', Matricula);