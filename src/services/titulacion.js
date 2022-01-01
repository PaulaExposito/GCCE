const { conexion } = require('../config/database.js');
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

function createTitulacion(titulacionDTO) {
    let sql = `INSERT INTO Titulacions (cod_titulo, asignaturas, num_cursos, tip_titul, tip_estud, total_cred, p_abandono) VALUES ?`
    conexion.query(sql, [titulacionDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

}


// Generate random data

const masterCred = [ 60, 120 ];
const studieTypes = require('../config/data').titles;

function generateTitulacion(id, gradeType, credits) {
    const title = [
        id,
        credits / 6,
        numberOfYears(gradeType, credits),
        gradeType,
        studieTypes[id],
        credits,
        getTitleAbandon(id),
    ]

    //await createTitulacion([title]);
    return title;
}

function generateTitle(id) {
    const type = randomIntFromInterval(1,2);
    if(type === 1) {
        return generateTitulacion(id, "grado", 240)
    }
    else {
        const masterType = randomIntFromInterval(0,1);
        return generateTitulacion(id, "master", masterCred[masterType])
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

module.exports = {
    generateTitle
}