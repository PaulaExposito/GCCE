const Acceso = require('../models/Acceso')

// Database access methods

async function createAcceso(accesoDTO) {
    console.log(accesoDTO);
    console.log();
}

async function removeAllAccesos() {
    await Acceso.remove({});
}

// Generate random data

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const accessType = ["EBAU", "FP", "Otra carrera"];


function generateAcceso(id) {
    const notaMedBas = randomIntFromInterval(5, 10);
    const notaMedEsp = randomIntFromInterval(5, 10);
    const notaBach= randomIntFromInterval(5, 10);
    const accessMark = notaMedBas * 0.4 + notaMedEsp * 0.1 + notaBach * 0.6;
    
    const access = {
        cod_alu: id,
        tipo_acceso: accessType[Math.floor(Math.random() * accessType.length)],
        nota_acceso: accessMark,
        nota_med_bas: notaMedBas,
        nota_med_esp: notaMedEsp,
        nota_bach: notaBach
    }
    createAcceso(access);
    return access;
}

module.exports = {
    generateAcceso
}