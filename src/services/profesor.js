const { conexion } = require('../config/database.js');
const { randomIntFromInterval } = require('../utils/utils.js');

// Database access methods

async function createProfesor(profesorDTO) {
    let sql = `INSERT INTO Profesor (cod_prof, asign_impartidas, nom_prof, apellido1, apellido2, catego, year, tiempo_ull) VALUES ?`
    conexion.query(sql, [profesorDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}


// Generate random data

const names = require('../config/data').names;
const lastnames = require('../config/data').lastnames;
const categories =  require('../config/data').categories;

function generateProfessor(id) {
    const yearBegin = randomIntFromInterval(2005, 2021);
    const yearEnd = yearBegin + 1;
    const professor = [
        id,
        randomIntFromInterval(1, 5),
        names[Math.floor(Math.random() * names.length)],
        lastnames[Math.floor(Math.random() * lastnames.length)] ,
        lastnames[Math.floor(Math.random() * lastnames.length)],
        categories[Math.floor(Math.random() * categories.length)],
        yearBegin + "/" + yearEnd,
        new Date().getFullYear() - yearBegin,
    ];

    //await createProfesor(professor);
    return professor;
}

module.exports = {
    generateProfessor
}