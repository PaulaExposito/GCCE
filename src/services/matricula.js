const { conexion } = require('../config/database.js');

// Database access methods

async function createMatricula(matriculaDTO) {
    let sql = `INSERT INTO Matricula (cod_matricula, cod_alumno, cred_aprobados, cred_matriculados, year, poat, nuevo_ingreso, coste_credito, beca, cancela_matricula) VALUES ?`
    await conexion.query(sql, [matriculaDTO], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

// Generate random data
const creditCost = 12.45;

function cancelInscription(alumno, numMatr, numTotalMatr) {
    if (alumno[2] == "abandono" && numMatr == numTotalMatr - 1)
        return true;
    else    
        return false;
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

function generateMatricula(id, alumno, numMat, matriculaAnterior, titulacion, trabaja, numTotalMatriculas) {
    const credsTitulacion = titulacion[5];
    let nuevosCredsAprobados;
    
    if (alumno[2] == "graduado")
        nuevosCredsAprobados = (parseInt(credsTitulacion / numTotalMatriculas / 6)) * 6 % 61;
    else 
        nuevosCredsAprobados = (parseInt((credsTitulacion) / numTotalMatriculas / 6)) * 6 - 12 % 61;

    if (nuevosCredsAprobados < 0)   
        nuevosCredsAprobados = 6;

    let credsAprobados = matriculaAnterior == null ? 0 : matriculaAnterior[2] + nuevosCredsAprobados; 
    credsAprobados = (credsAprobados <= credsTitulacion) ? credsAprobados : credsTitulacion;

    const credsPendientes = credsTitulacion - credsAprobados;
    const credsMatriculados = credsPendientes > 60 ? 60 : credsPendientes;

    const nuevoIngreso = (numMat == 0) ? true : false;
    
    const matricula = [
        id,
        alumno[0],
        credsAprobados,      // depende del estado (y de la matricula anterior)
        credsMatriculados,
        getYear(alumno[7], numMat),
        Math.random() < 0.5,
        nuevoIngreso,
        creditCost,  
        hasBeca(alumno[10], numMat, titulacion[2], trabaja),
        cancelInscription(alumno, numMat, numTotalMatriculas),
    ];

    createMatricula(matricula);
    return matricula;
}

module.exports = {
    generateMatricula
}
