const Matricula = require('../models/Matricula')

// Database access methods

async function createMatricula(matriculaDTO) {
    //console.log(matriculaDTO);
    //console.log();
}


// Generate random data
const creditCost = 12.45;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomIntFromIntervalCredits(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) * 6
}

function generateMatricula(id, id_alu) {
    const yearBegin = randomIntFromInterval(2005,2021);
    const yearEnd = yearBegin + 1;
    const matricula = {
        cod_matricula: id,
        cod_alumno: id_alu,
        cred_aprobados: randomIntFromIntervalCredits(1,4),
        cred_matriculados: randomIntFromIntervalCredits(1,4),
        year: yearBegin + "/" + yearEnd,
        poat: Math.random() < 0.5,
        nuevo_ingreso: Math.random() < 0.5,
        coste_credito: creditCost,
        beca: Math.random() < 0.5,
        cancela_matricula: Math.random() < 1,
    }

    createMatricula(matricula);
    return matricula
}

module.exports = {
    generateMatricula
}
