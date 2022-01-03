
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

const { 
    NUMBER_OF_COHORTS, 
    NUMBER_OF_STUDENTS_BY_COHORT, 
    NUMBER_OF_TITLES, 
    NUMBER_OF_PROFESSORS 
} = require('./config/config');

const { randomIntFromInterval, getNumberOfMatriculas } = require('./utils/utils');

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


let generatedTitles = [];
let generatedSubjects = [];
let generatedProfessor = [];
let generatedStudents = [];
let generatedAccess = [];
let generatedInscription = [];
let generatedExternalServices = [];
let generatedCalifAcademica = [];


// Generación de títulos

// sequelize.sync().then(() => {
    
    /// Generar profesores
    for (let i = 0; i < NUMBER_OF_PROFESSORS; ++i) {
        generatedProfessor.push(profesor.generateProfessor(i));
        // console.log(generatedProfessor[i].toString());
    }

    let cod = 0;

    /// Generar Titulaciones
    for (let i = 0; i < NUMBER_OF_TITLES; ++i) {
        generatedTitles.push(titulacion.generateTitle(i));
        // console.log(generatedTitles[i]);
        let secret = [0,0];
        for (let j = 0; j < generatedTitles[i][1]; j++) {
            let prof = randomIntFromInterval(0, NUMBER_OF_PROFESSORS - 1);
            generatedSubjects.push(asignatura.generateAsignatura(cod++, 
                                                                 generatedTitles[i][0], 
                                                                 generatedTitles[i][1], 
                                                                 generatedProfessor[prof][0],
                                                                 secret));
            // if (i == 0) { 
            //     console.log(generatedTitles[i]);
            //     console.log(generatedSubjects[cod - 1]); 
            // }
        }
    }

    cod = 0;
    let codMatricula = 0;
    /// Generar Alumnos && Acceso && ServiciosExternos
    for (let i = 0; i < NUMBER_OF_COHORTS; i++) {   
        for (let j = 0; j < NUMBER_OF_TITLES; j++) {  
            for (let k = 0; k < NUMBER_OF_STUDENTS_BY_COHORT; k++) { 

                // TODO: borrar
                if (i != 0 || j != 0 || k != 0) return 0;

                generatedAccess.push(acceso.generateAcceso(cod));
                generatedStudents.push(alumno.generateAlumno(cod, generatedTitles[j], i, generatedAccess[cod]));
                generatedExternalServices.push(serviciosexternos.generateServiciosExternos(cod, generatedTitles[j]));

                const numMatriculas = getNumberOfMatriculas(generatedStudents[cod], generatedTitles[j]);
                for (let l = 0; l < numMatriculas; l++) {
                    const previousInscription = (l == 0 ? null : generatedInscription[codMatricula - 1]);
                    generatedInscription.push(
                        matricula.generateMatricula(codMatricula, 
                                                    generatedStudents[cod], 
                                                    l,
                                                    previousInscription,
                                                    generatedTitles[j],
                                                    generatedExternalServices[cod][2]));
                        
                    // Probably needs to generate here califAcademic to pass it to next inscription

                    codMatricula++;
                }

                cod++;

                if (cod - 1 == 0) {
                    console.log(generatedStudents[cod - 1]);
                //     console.log(generatedTitles[j]);
                //     console.log(generatedAccess[cod - 1]);
                //     console.log(generatedExternalServices[cod - 1]);
                    console.log(generatedInscription[0]);
                }
            }
        }
    }

//     disconnectDatabase();
// });



// cod = 0;
// for (let i = 0; i < NUMBER_OF_STUDENTS; i++) {
//     const title = randomIntFromInterval(0, generatedTitles.length - 1)
//     const subject = randomIntFromInterval(0, generatedSubjects.length - 1)
//     generatedCalifAcademica.push(califacademica.generateCalifAcademica(generatedInscription[cod].cod_matricula, generatedSubjects[randomIntFromInterval(0, generatedSubjects.length - 1)].curso,
//     generatedTitles[title].cod_titul, generatedSubjects[subject].profesor, cod++, generatedSubjects[subject].cod_asig));
//     console.log(generatedCalifAcademica[cod - 1]);
// }


