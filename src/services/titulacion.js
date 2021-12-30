// const Titulacion = require('../models/Titulacion');
const { conexion } = require('../config/database.js')

// Database access methods

async function createTitulacion(titulacionDTO) {
    // console.log(titulacionDTO);
    // console.log();
    // if (titulacionDTO == null)  return;
    // const titulacion = new Titulacion(titulacionDTO);
    // await titulacion.save();

    conexion.query("CREATE DATABASE Titulacion IF NOT EXISTS Titulacion", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    let sql = `
        INSERT INTO Titulacion (id, cod_titulo, asignaturas, num_cursos, tit_titul, tit_estud, total_cred, p_abandono) VALUES ?
    `
    conexion.query(sql, [titulacionDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

}

// async function getAllTitulaciones() {
//     const titulacion = await Titulacion.find();
//     console.log(titulacion);
// }

// async function removeAllTitulaciones() {
//     await Titulacion.remove({});
// }


// Generate random data

const masterCred = [ 60, 120 ];
const studieTypes = require('../config/data').titles;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

    createTitulacion(title)
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
        return randomIntFromInterval(30, 80);
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