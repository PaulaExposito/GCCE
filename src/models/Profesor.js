const mongoose = require('mongoose');

const Profesor = new mongoose.Schema({
    cod_prof: Number,
    nom_prof: String,
    apellido1: String ,
    apellido2: String,
    catego: String,
    year: Number,
    tiempo_ull: Number,
    num_sexe: Number,
    sexe_act: Number,
});

module.exports = mongoose.model('Profesor', Profesor);