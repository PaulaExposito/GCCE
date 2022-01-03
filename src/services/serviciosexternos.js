const ServiciosExternos = require('../models/ServiciosExternos')
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

async function createServiciosExternos(externServicDTO) {
    let sql = `INSERT INTO ServiciosExternos (num_ss, cod_alumno, trabaja, sueldo) VALUES ?`
    conexion.query(sql, [externServicDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}


// Generate random data

function generateServiciosExternos(cod, titulacion) {
    const randomWork = Math.random();
    let work = true;
    let num_ss = randomIntFromInterval(0, 1_000_000);
    let money = 0;

    if(randomWork < 0.5 && titulacion[3] == "master") {
        money = randomIntFromInterval(10000, 30000);
    }
    else if(randomWork > 0.5 && titulacion[3] == "master") {
        money = randomIntFromInterval(10000, 20000);
    }
    else if (titulacion[3] == "grado" && randomWork < 0.8) {
        money = randomIntFromInterval(1000, 10000);
    }
    else {
        work = false;
    }

    const servicio = [
        num_ss,
        cod,
        work,
        money
    ]
    //createServiciosExternos(servicio);
    return servicio;
}

module.exports = {
    generateServiciosExternos
}
