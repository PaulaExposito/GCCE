const ServiciosExternos = require('../models/ServiciosExternos')

// Database access methods

async function createServiciosExternos(asigDTO) {
    //console.log(asigDTO);
    //console.log();
}


// Generate random data

const asigMark = ["Insuficiente", "Suficiente", "Notable", "Sobresaliente", "Matricula de Honor"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateServiciosExternos(id) {
    const work = Math.random() < 0.5;
    let money = 0;
    if(work) {
        money = randomIntFromInterval(10000, 30000);
    }
    const servicio = {
        cod_alumno: id,
        trabaja: work,
        sueldo: money
    }
    createServiciosExternos(servicio);
    return servicio;
}

module.exports = {
    generateServiciosExternos
}
