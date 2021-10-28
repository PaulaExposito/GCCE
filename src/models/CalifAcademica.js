const mongoose = require('mongoose');

const CalifAcademica = new mongoose.Schema({
    cod_matricula: Number,
    // curso: Number,
    cod_titul: Number,
    cod_prof: Number ,
    cod_alu: Number,
    cod_asig: Number,
    // grupo: Number,
    convocatoria: Number,
    calif_num: Number,
    calificacion: String,
    presentado: Boolean
});

module.exports = mongoose.model('CalifAcademica', CalifAcademica);