// const mysql = require('mysql');

// let conexion= mysql.createConnection({
//     host : 'localhost',
//     database : 'GCCE',
//     user : 'root',
//     password : 'root',
//     port: 3306,
//     insecureAuth : true
// });

// conexion.connect(function(err) {
//     if (err) {
//         console.error('Error de conexion: ' + err.stack);
//         return;
//     }
//     console.log('Conectado con el identificador ' + conexion.threadId);
// });

// conexion.end();

// const alumno = require('./services/alumno');
const titulacion = require('./services/titulacion');
// const acceso = require('./services/acceso');
const asignatura = require('./services/asignatura');
// const matricula = require('./services/matricula');
const profesor = require('./services/profesor');
// const notaebau = require('./services/notaebau');
// const califacademica = require('./services/califacademica');
// const serviciosexternos = require('./services/serviciosexternos');

const { NUMBER_OF_TITLES, NUMBER_OF_PROFESSORS } = require('./config/config');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let generatedTitles = [];
let generatedSubjects = [];
let generatedProfessor = [];

for (let i = 0; i < NUMBER_OF_TITLES; ++i) {
    generatedTitles.push(titulacion.generateTitle(i));
    // console.log(generatedTitles[i]);
}

for (let i = 0; i < NUMBER_OF_PROFESSORS; ++i) {
    generatedProfessor.push(profesor.generateProfessor(i));
    // console.log(generatedProfessor[i]);
}

let cod = 0;
for (let i = 0; i < NUMBER_OF_TITLES; i++) { 
    for (let j = 0; j < generatedTitles[i].asignaturas; j++) {
        let prof = randomIntFromInterval(0, NUMBER_OF_PROFESSORS - 1);
        generatedSubjects.push(asignatura.generateAsignatura(cod++, generatedTitles[i].cod_titul, generatedTitles[i].asignaturas, generatedProfessor[prof].cod_prof));
        console.log(generatedSubjects[cod - 1]);
    }
}


// for (let i = 0; i < 5; ++i) {
//     console.log(i)
//     alumno.generateAlumno();
// }


// for (let i = 0; i < 4; ++i) {
//     acceso.generateAcceso();
// }


// for (let i = 0; i < 4; ++i) {
//     matricula.generateMatricula();
// }

// for (let i = 0; i < 4; ++i) {
//     profesor.generateProfesor();
// }

// for (let i = 0; i < 4; ++i) {
//     notaebau.generateNotaEbau();
// }

// for (let i = 0; i < 4; ++i) {
//     califacademica.generateCalifAcademica();
// }

// for (let i = 0; i < 4; ++i) {
//     serviciosexternos.generateServiciosExternos();
// }
