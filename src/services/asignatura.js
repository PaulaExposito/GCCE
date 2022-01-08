const { conexion } = require('../config/database.js');
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

async function createAsignatura(asigDTO) {
    let sql = `INSERT INTO Asignatura (cod_asig, cod_titulo, profesor, dificultad, cred_asig, nom_asig, curso, cuatrimestre, tip_asig, especial) VALUES ?`
    await conexion.query(sql, [asigDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}


// Generate random data

const asigDifficulty = require('../config/data').asigDifficulty;

function generateType(specials) {
    // Specials is an array of two elements
    for (let i = 0; i < 2; i++) {
        if (specials[0] == 0) {
            specials[0] = 1;
            return "Trabajo Final";
        }
        else if (specials[1] == 0) {
            specials[1] = 1;
            return "Practicas externas";
        }
    }

    const random = Math.random();
    return (random < 0.7) ? "Obligatoria" : "Optativa";
}

function isSpecial(type) {
    return (type == "Trabajo Final" || type == "Practicas Externas");
}

function getCredits(type) {
    switch (type) {
        case "Trabajo Final": return 12;
        case "Practicas Externas": return 12;
        default: return 6;
    }
}

function generateAsignatura(id, titleId, nSubjects, profId, secret) {
    const type = generateType(secret);

    const subject = [
        id,
        titleId,
        profId,
        asigDifficulty[Math.floor(Math.random() * asigDifficulty.length)], // yo esto no lo pondria
        getCredits(type),
        `NOMBRE_ASIG_${id % nSubjects + 1}`,
        randomIntFromInterval(1990, 2000),
        randomIntFromInterval(1, 2),
        type,
        isSpecial(type),
    ];
    
    createAsignatura(subject);
    return subject;
}

module.exports = {
    generateAsignatura
}
