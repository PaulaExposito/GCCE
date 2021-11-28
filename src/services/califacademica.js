const CalifAcademica = require('../models/CalifAcademica')

// Database access methods

async function createCalifAcademica(asigDTO) {
    //console.log(asigDTO);
    //console.log();
}


// Generate random data

const asigMark = ["Insuficiente", "Suficiente", "Notable", "Sobresaliente", "Matricula de Honor"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateCalifAcademica(id_matricula, id_curso, id_titul, id_prof, id_alu, id_asig) {
    const calif = randomIntFromInterval(1,10);
    let califString = "";
    let noPresentado = true;
    if (calif === 10) {
        califString = asigMark[4];
    }      
    else if (calif >= 9 && calif < 10) {
        califString = asigMark[3];
    }
    else if (calif >= 7 && calif < 9) {
        califString = asigMark[2];
    }
    else if (calif >= 5 && calif < 7) {
        califString = asigMark[1];
    }
    else {
        califString = asigMark[0];
        if(calif == 0) {
            noPresentado = false;
        }
    }
    const califAcad = {
        cod_matricula: id_matricula,
        curso: id_curso,
        cod_titul: id_titul,
        cod_prof: id_prof ,
        cod_alu: id_alu,
        cod_asig: id_asig,
        convocatoria: randomIntFromInterval(1,6),
        calif_num: calif,
        calificacion: califString,
        presentado: noPresentado
    }
    createCalifAcademica(califAcad);
    return califAcad;
}

module.exports = {
    generateCalifAcademica
}
