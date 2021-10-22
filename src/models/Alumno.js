const mongoose = require('mongoose');

const Alumno = new mongoose.Schema({
    cod_alu: Number,
    nom_alu: String,
    apellido1: String ,
    apellido2: String,
    sexo: String,
    year: Number,
    niv_est_prog1: String,
    niv_est_prog2: String,
    niv_renta: Number,
    isla: String,
});

module.exports = mongoose.model('Alumno', Alumno);