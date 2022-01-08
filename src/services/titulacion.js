const { conexion } = require('../config/database.js');
const { Titulacion } = require('../models/Titulacion');
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

async function createTitulacion(titulacionDTO) {
    let sql = `INSERT INTO Titulacion (cod_titulo, asignaturas, num_cursos, tip_titul, tip_estud, total_cred, p_abandono) VALUES ?`
    await conexion.query(sql, [titulacionDTO], function (err, result) {
        if (err) throw err;
        console.log("(Titulacion) : Number of records inserted: " + result.affectedRows);
    });

}


// Generate random data

const masterCred = [ 60, 120 ];
const studieTypes = require('../config/data').titles;

function generateTitle(id) {
    const type = randomIntFromInterval(1,4);
    if(type <= 3) {
        return generateTitulacion(id, "grado", 240);
    }
    else {
        const masterType = randomIntFromInterval(0,1);
        return generateTitulacion(id, "master", masterCred[masterType]);
    }
}

function getTitleAbandon(id) {
    if (id < studieTypes.length / 2)
        return randomIntFromInterval(30, 70);
    else 
        return randomIntFromInterval(0, 50);
}

function numberOfYears(gradeType, credits) {
    if (gradeType == "grado") return 4;
    else return (credits / 6) / 10;
}

function generateTitulacion(id, gradeType, credits) {
    const title = [
        id,
        credits / 6 - 2,
        numberOfYears(gradeType, credits),
        gradeType,
        studieTypes[id],
        credits,
        getTitleAbandon(id),
    ];

    createTitulacion([title]);
    return title;
}

module.exports = {
    generateTitle
}