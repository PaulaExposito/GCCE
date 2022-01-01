
const { connectDatabase, disconnectDatabase, sequelize } = require('./config/database.js');
// connectDatabase();

const alumno = require('./services/alumno');
const titulacion = require('./services/titulacion');
const acceso = require('./services/acceso');
const asignatura = require('./services/asignatura');
const matricula = require('./services/matricula');
const profesor = require('./services/profesor');
const califacademica = require('./services/califacademica');
const serviciosexternos = require('./services/serviciosexternos');

const { NUMBER_OF_COHORTS, NUMBER_OF_STUDENTS_BY_COHORT, NUMBER_OF_TITLES, NUMBER_OF_PROFESSORS } = require('./config/config');

let codAlusUsed = []

function aleatorio(min, max) {
    if (codAlusUsed.length != (max - min)) {
        let num;
        let repe = false;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
            repe = repetido(num);
        } while (repe != false);
        codAlusUsed.push(num);
        return num;
    } else {
        return 0;
    }
}

function repetido(num) {
    let repe = false;
    for (let i = 0; i < codAlusUsed.length; i++) {
        if (num == codAlusUsed[i]) {
            repe = true;
        }
    }
    return repe;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let generatedTitles = [];
let generatedSubjects = [];
let generatedProfessor = [];
let generatedStudents = [];
let generatedAccess = [];
let generatedInscription = [];
let generatedExternServices = [];
let generatedCalifAcademica = [];


// Generación de títulos

// sequelize.sync().then(() => {

    /// Generar Titulaciones
    for (let i = 0; i < NUMBER_OF_TITLES; ++i) {
        generatedTitles.push(titulacion.generateTitle(i));
        // console.log(generatedTitles[i]);
    }

    /// Generar profesores
    for (let i = 0; i < NUMBER_OF_PROFESSORS; ++i) {
        generatedProfessor.push(profesor.generateProfessor(i));
        // console.log(generatedProfessor[i].toString());
    }

    /// Generar Alumnos && Acceso
    let cod = 0;
    for (let i = 0; i < NUMBER_OF_COHORTS; i++) {   
        for (let j = 0; j < NUMBER_OF_TITLES; j++) {  
            for (let k = 0; k < NUMBER_OF_STUDENTS_BY_COHORT; k++) { 
                generatedAccess.push(acceso.generateAcceso(cod));
                generatedStudents.push(alumno.generateAlumno(cod, generatedTitles[j], i, generatedAccess[cod]));
                cod++;
                if (cod - 1 == 0) {
                    console.log(generatedStudents[cod - 1]);
                    console.log(generatedAccess[cod - 1]);
                }
            }
        }
    }

//     disconnectDatabase();
// });



// let cod = 0;
// for (let i = 0; i < NUMBER_OF_TITLES; i++) { 
//     for (let j = 0; j < generatedTitles[i].asignaturas; j++) {
//         let prof = randomIntFromInterval(0, NUMBER_OF_PROFESSORS - 1);
//         generatedSubjects.push(asignatura.generateAsignatura(cod++, generatedTitles[i].cod_titul, generatedTitles[i].asignaturas, generatedProfessor[prof].cod_prof));
//         console.log(generatedSubjects[cod - 1]);
//     }
// }








// cod = 0;
// for (let i = 0; i < NUMBER_OF_STUDENTS; i++) { 
//     generatedInscription.push(matricula.generateMatricula(cod++, aleatorio(0,999)));
//     console.log(generatedInscription[cod - 1]);
// }

// cod = 0;
// for (let i = 0; i < NUMBER_OF_STUDENTS; i++) { 
//     generatedExternServices.push(serviciosexternos.generateServiciosExternos(cod++));
//     console.log(generatedExternServices[cod - 1]);
// }

// cod = 0;
// for (let i = 0; i < NUMBER_OF_STUDENTS; i++) {
//     const title = randomIntFromInterval(0, generatedTitles.length - 1)
//     const subject = randomIntFromInterval(0, generatedSubjects.length - 1)
//     generatedCalifAcademica.push(califacademica.generateCalifAcademica(generatedInscription[cod].cod_matricula, generatedSubjects[randomIntFromInterval(0, generatedSubjects.length - 1)].curso,
//     generatedTitles[title].cod_titul, generatedSubjects[subject].profesor, cod++, generatedSubjects[subject].cod_asig));
//     console.log(generatedCalifAcademica[cod - 1]);
// }


