
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
    let asignaurasPorTitulacion = new Array(NUMBER_OF_TITLES);

    /// Generar Titulaciones
    for (let i = 0; i < NUMBER_OF_TITLES; ++i) {
        generatedTitles.push(titulacion.generateTitle(i));
        // console.log(generatedTitles[i]);
        let secret = [0,0];
        
        asignaurasPorTitulacion[i] = [];

        for (let j = 0; j < generatedTitles[i][1]; j++) {
            let prof = randomIntFromInterval(0, NUMBER_OF_PROFESSORS - 1);
            generatedSubjects.push(asignatura.generateAsignatura(cod, 
                                                                 generatedTitles[i][0], 
                                                                 generatedTitles[i][1], 
                                                                 generatedProfessor[prof][0],
                                                                 secret));
            
            asignaurasPorTitulacion[i].push(cod);
            cod++;

            // if (i == 0) { 
            //     console.log(generatedTitles[i]);
            //     console.log(generatedSubjects[cod - 1]); 
            // }
        }
    }

    cod = 0;
    let codMatricula = 0;
    let codCalifAcademica = 0;
    /// Generar Alumnos && Acceso && ServiciosExternos
    for (let i = 0; i < NUMBER_OF_COHORTS; i++) {   
        for (let j = 0; j < NUMBER_OF_TITLES; j++) {  
            for (let k = 0; k < NUMBER_OF_STUDENTS_BY_COHORT; k++) { 
                
                if (i == 0 && j == 0 && k == 2) process.exit();
                
                generatedAccess.push(acceso.generateAcceso(cod));
                generatedStudents.push(alumno.generateAlumno(cod, generatedTitles[j], i, generatedAccess[cod]));
                generatedExternalServices.push(serviciosexternos.generateServiciosExternos(cod, generatedTitles[j]));
                
                const numMatriculas = getNumberOfMatriculas(generatedStudents[cod], generatedTitles[j]);
                
                
                console.log("NumMatriculas = ", numMatriculas)
                console.log("Años titul = ", generatedTitles[j][2])
                console.log("Alumno ", generatedStudents[cod])


                // Si es 0 <- no se ha tenido en cuenta
                // Si es 1 <- se está usando ahora
                // Si es 2 <- ya se usó
                let asigEspeciales = [0, 0];
                let asigAprobadas = new Array(generatedTitles[j][1]).fill(false);

                // Primera matricula, caso inicial
                generatedInscription.push(
                    matricula.generateMatricula(codMatricula, 
                                                generatedStudents[cod], 
                                                0,
                                                null,
                                                generatedTitles[j],
                                                generatedExternalServices[cod][2],
                                                numMatriculas));

                console.log("Matricula inicial ", codMatricula)
                console.log(generatedInscription[codMatricula]);
                codMatricula++;

                for (let l = 1; l < numMatriculas + 1; l++) {

                    if (l != numMatriculas) {
                        const previousInscription = generatedInscription[codMatricula - 1];
                        generatedInscription.push(
                            matricula.generateMatricula(codMatricula, 
                                                        generatedStudents[cod], 
                                                        l,
                                                        previousInscription,
                                                        generatedTitles[j],
                                                        generatedExternalServices[cod][2],
                                                        numMatriculas));

                        console.log("Matricula ", codMatricula)
                        console.log(generatedInscription[codMatricula]);
                    }

                    /// Generar CalifAcademica
                    // console.log("|--- !\n", generatedInscription[codMatricula - 1]);
                    let credsMatriculados = generatedInscription[codMatricula - 1][3];

                    if (credsMatriculados >= 12 && credsMatriculados < 24 && asigEspeciales[0] == 0)
                        asigEspeciales = [1, 0]
                    else if (credsMatriculados >= 24 && asigEspeciales[0] == 0 && asigEspeciales[1] == 0)
                        asigEspeciales = [1, 1]
                    else if (credsMatriculados >= 12 && asigEspeciales[0] != 0 && asigEspeciales[1] == 0)
                        asigEspeciales = [1, 1]

                    let contCredsMatr = 0;
                    let contCredsApro = 0;

                    let siguienteMatricula = (l == numMatriculas) ? null : generatedInscription[codMatricula];

                    for (let m = 0; m < generatedTitles[j][1]; m++) {   // Recorre todas las asignaturas

                        if (asigAprobadas[m] == false) {

                            // if (asigEspeciales[0] == 1) contCredsMatr += 12;
                            // else if (asigEspeciales[1] == 1) contCredsMatr += 12;
                            // else contCredsMatr += 6;

                            // if (l == 0 && m == 0 || l == 0 && m == 1)   contCredsMatr += 12;
                            // else contCredsMatr += 6;


                            const vaAAprobar = (siguienteMatricula != null && 
                                                    contCredsApro + generatedSubjects[asignaurasPorTitulacion[j][m]][4] <= siguienteMatricula[2]) 
                                                        ? true : false;

                            console.log("aprobar? ", vaAAprobar)
                            console.log("sig matricula ", siguienteMatricula)
                            // console.log("asignatura ", generatedSubjects[asignaurasPorTitulacion[j][m]])
                            console.log("valor ", generatedSubjects[asignaurasPorTitulacion[j][m]][4])

                            generatedCalifAcademica.push(
                                califacademica.generateCalifAcademica(
                                    codCalifAcademica++,
                                    generatedInscription[codMatricula - 1],
                                    generatedTitles[j],
                                    generatedStudents[cod],
                                    generatedSubjects[asignaurasPorTitulacion[j][m]],
                                    asigAprobadas,
                                    vaAAprobar,
                                    asigEspeciales
                                )  
                            )

                            if (vaAAprobar)
                                contCredsApro += generatedSubjects[asignaurasPorTitulacion[j][m]][4];

                            if (generatedCalifAcademica[generatedCalifAcademica.length - 1] >= 5)
                                asigAprobadas[m] = true;

                            contCredsMatr += generatedSubjects[asignaurasPorTitulacion[j][m]][4];
                            
                            console.log("CalifAcademica ", generatedCalifAcademica[generatedCalifAcademica.length - 1])

                            if (contCredsMatr == credsMatriculados) break;
                        }
                    } 

                    // Probably needs to generate here califAcademic to pass it to next inscription

                    // console.log(codMatricula)
                    if (l != numMatriculas)
                        codMatricula++; 
                }

                cod++;

                // if (cod - 1 == 0) {
                //     console.log("Alumno")
                //     console.log(generatedStudents[cod - 1]);
                //     console.log("Titulos")
                //     console.log(generatedTitles[j]);
                //     // console.log("Acceso")
                //     // console.log(generatedAccess[cod - 1]);
                //     // console.log("Servicios Externos")
                //     // console.log(generatedExternalServices[cod - 1]);
                // }
            }
        }
        
        
    }

//     disconnectDatabase();
// });

