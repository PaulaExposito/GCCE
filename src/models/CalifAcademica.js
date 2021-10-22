const mongoose = require('mongoose');

const CalifAcademica = new mongoose.Schema({
    curso: Number,
    cod_titul: Number,
    cod_prof: Number ,
    cod_alu: Number,
    cod_asig: Number,
    grupo: Number,
    convocatoria: Number,
    calif_num: Number,
    calificacion: String,
});

module.exports = mongoose.model('CalifAcademica', CalifAcademica);