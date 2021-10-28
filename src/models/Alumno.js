const mongoose = require('mongoose');

const Alumno = new mongoose.Schema({
    // cod_alu: Number, // no hace falta -> mongo genera _id
    cod_titulo: Number, // cambiar a mongoose.Types.ObjectId
    estado: String,
    nom_alu: String,
    apellido1: String ,
    apellido2: String,
    sexo: String,
    year: Number,
    niv_est_prog1: String,
    niv_est_prog2: String,
    niv_renta: Number,
    municipio: String,
    provincia: String,
});

module.exports = mongoose.model('Alumno', Alumno);