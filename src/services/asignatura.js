// const Asignatura = require('../models/Asignatura')

// Database access methods

async function createAsignatura(asigDTO) {
    // console.log(asigDTO);
    // console.log();
}


// Generate random data

const asigType = ["Obligatoria", "Optativa", "Practicas Externas", "Trabajo Fin"];
const asigName = ["Física", "Empresariales", "Cálculo", "Álgebra", "Biología", "Química", "Dibujo Técnico"]
const asigDifficulty = ["Fácil", "Medio", "Difícil", "Muy difícil"];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomIntFromIntervalCredits(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) * 6
}

function generateAsignatura(id, titleId, nSubjects, prof) {
    const subject = {
        cod_asig: id,
        cod_titulo: titleId,
        profesor: prof,
        dificultad: asigDifficulty[Math.floor(Math.random() * asigDifficulty.length)], // yo esto no lo pondria
        cred_asig: randomIntFromIntervalCredits(1,3),
        // nom_asig: asigName[Math.floor(Math.random() * asigName.length)],
        nom_asig: `NAME_ASIG_${id % nSubjects + 1}`,
        curso: randomIntFromInterval(2005, 2020),
        cuatrimestre: randomIntFromInterval(1,2),
        tip_asig: asigType[Math.floor(Math.random() * asigType.length)],
        especial: Math.random() < 0.5,
    }
    createAsignatura(subject);
    return subject;
}

module.exports = {
    generateAsignatura
}
