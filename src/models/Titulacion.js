const mongoose = require('mongoose');

const Titulacion = new mongoose.Schema({
    cod_titul: Number,
    num_cursos: Number,
    tip_estud: String ,
    tip_titul: String,
    total_cred: Number,
});

module.exports = mongoose.model('Titulacion', Titulacion);