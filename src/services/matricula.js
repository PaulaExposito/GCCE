const Matricula = require('../models/Matricula')
const { randomIntFromInterval, getInitYear } = require('../utils/utils.js');
// Database access methods

async function createMatricula(matriculaDTO) {
    let sql = `INSERT INTO Asignatura (cod_matricula, cod_alumno, cred_aprobados, cred_matriculados, year, poat, curso, nuevo_ingreso, coste_credito, beca, cancela_matricula) VALUES ?`
    conexion.query(sql, [matriculaDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

// Generate random data
const creditCost = 12.45;

// function randomIntFromIntervalCredits(min, max) { // min and max included 
//     return Math.floor(Math.random() * (max - min + 1) + min) * 6
// }

function cancelInscription(alumno) {
    switch(alumno[2]) {
        case "activo": return Math.random() < 0.2 ? true : false;
        case "pausado": return false;
        case "graduado": return false;
        case "abandono": return true;
    }
}

function getYear(initCourse, numMatricula) {
    const initYear = parseInt(initCourse.split("/")[0]);
    return `${initYear + numMatricula}/${initYear + numMatricula + 1}`;
}

function hasBeca(nivelRenta, numMat, duracionTitulacion, trabaja) {
    if (trabaja)    
        return false;
    else if (duracionTitulacion > numMat + 2)   
        return false;
    else    
        return (nivelRenta == "alto") ? false : true;
}

function generateMatricula(id, alumno, numMat, matriculaAnterior, titulacion, trabaja) {
    console.log(id)
    console.log(matriculaAnterior)
    
    // TODO: Change this to have the possibility of dont pass a subject
    const credsAprobados = matriculaAnterior == null ? 0 : matriculaAnterior[2] + matriculaAnterior[3]; 

    const credsTitulacion = titulacion[5];
    const credsPendientes = credsTitulacion - credsAprobados;
    const credsMatriculados = credsPendientes > 60 ? 60 : credsPendientes;

    const nuevoIngreso = (numMat == 0) ? true : false;
    
    const matricula = {
        cod_matricula: id,
        cod_alumno: alumno[0],
        cred_aprobados: credsAprobados,      // depende del estado (y de la matricula anterior)
        cred_matriculados: credsMatriculados,
        year: getYear(alumno[7], numMat),
        poat: Math.random() < 0.5,
        nuevo_ingreso: nuevoIngreso,
        coste_credito: creditCost,  
        beca: hasBeca(alumno[10], numMat, titulacion[2], trabaja),
        cancela_matricula: cancelInscription(alumno),
    }

    // await createMatricula(matricula);
    return matricula;
}

module.exports = {
    generateMatricula
}
