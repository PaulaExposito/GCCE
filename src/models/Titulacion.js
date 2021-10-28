const mongoose = require('mongoose');

const Titulacion = new mongoose.Schema({
    cod_titul: Number,
    asignaturas: Array,
    num_cursos: Number,
    tip_titul: String,
    tip_estud: String ,
    total_cred: Number,
    p_abandono: Number
});

module.exports = mongoose.model('Titulacion', Titulacion);