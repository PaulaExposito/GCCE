const Asignatura = require('../models/Asignatura')

// Database access methods

async function createAsignatura(asigDTO) {
    console.log(asigDTO);
    console.log();
}


// Generate random data

const asigType = ["Onlogatoria", "Optativa"]
const asigName = ["Física", "Empresariales", "Cálculo", "Álgebra", "Biología", "Química", "Dibujo Técnico"]
const asigDifficulty = ["Fácil", "Medio", "Difícil", "Muy difícil"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomIntFromIntervalCredits(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) * 6
}

function generateAsignatura() {

    createAsignatura({
        //cod_asig: Number,
        //cod_titulo: Number,
        //profesor: Array,
        dificultad: asigDifficulty[Math.floor(Math.random() * asigDifficulty.length)], // yo esto no lo pondria
        cred_asig: randomIntFromIntervalCredits(1,3),
        nom_asig: asigName[Math.floor(Math.random() * asigName.length)],
        curso: randomIntFromInterval(2005, 2020),
        cuatrimestre: randomIntFromInterval(1,2),
        tip_asig: asigType[Math.floor(Math.random() * asigType.length)],
        especial: Math.random() < 0.5,
    });
}

module.exports = {
    generateAsignatura
}
