const mongoose = require('mongoose');

const NotaEbau = new mongoose.Schema({
    cod_materia: Number,
    materia: String,
    nota: Number,
});

module.exports = mongoose.model('NotaEbau', NotaEbau);