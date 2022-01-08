const { conexion } = require('../config/database.js');
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

async function createAcceso(accesoDTO) {
    let sql = `INSERT INTO Acceso (cod_alu, tipo_acceso, nota_acceso, nota_med_bas, nota_med_esp, nota_bach) VALUES ?`
    await conexion.query(sql, [accesoDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

// Generate random data

const accessType = require('../config/data').accessType;

function generateAcceso(id) {
    const notaMedBas = randomIntFromInterval(5, 10);
    const notaMedEsp = randomIntFromInterval(5, 10);
    const notaBach= randomIntFromInterval(5, 10);
    const accessMark = Math.round((notaMedBas * 0.4 + notaMedEsp * 0.4 + notaBach * 0.6) / 1.4 * 100) / 100;
    
    const access = [
        id,
        accessType[Math.floor(Math.random() * accessType.length)],
        accessMark,
        notaMedBas,
        notaMedEsp,
        notaBach
    ];

    createAcceso(access);
    return access;
}

module.exports = {
    generateAcceso
}