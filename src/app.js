
const { program } = require('commander');
const { connectDatabase, disconnectDatabase, sequelize } = require('./config/database.js');
connectDatabase();

const alumno = require('./services/alumno');
const titulacion = require('./services/titulacion');
const acceso = require('./services/acceso');
const asignatura = require('./services/asignatura');
const matricula = require('./services/matricula');
const profesor = require('./services/profesor');
const califacademica = require('./services/califacademica');
const serviciosexternos = require('./services/serviciosexternos');

const { dropTables } = require('./services/controlDatabase');

const { 
    NUMBER_OF_COHORTS, 
    NUMBER_OF_STUDENTS_BY_COHORT, 
    NUMBER_OF_TITLES, 
    NUMBER_OF_PROFESSORS 
} = require('./config/config');

const { randomIntFromInterval, getNumberOfMatriculas } = require('./utils/utils');


// Command line options

program
    .name("npm run gen")
    .usage('[options]')
    .option('-d, --delete', 'delete all tables in GCCE database')

program.parse(process.argv);
const options = program.opts();


// Local data 

let generatedTitles = [];
let generatedSubjects = [];
let generatedProfessor = [];
let generatedStudents = [];
let generatedAccess = [];
let generatedInscription = [];
let generatedExternalServices = [];
let generatedCalifAcademica = [];


// Generación de títulos

sequelize.sync().then(() => {
    
    // If --delete options is set, delete tables and exits the program
    dropTables();

    if (options.delete) 
        process.exit(0);

    /// Generar profesores
    for (let i = 0; i < NUMBER_OF_PROFESSORS; ++i) {
        generatedProfessor.push(profesor.generateProfessor(i));
    }

    let cod = 0;
    let asignaurasPorTitulacion = new Array(NUMBER_OF_TITLES);

    /// Generar Titulaciones
    for (let i = 0; i < NUMBER_OF_TITLES; ++i) {
        generatedTitles.push(titulacion.generateTitle(i));
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
        }
    }

    cod = 0;
    let codMatricula = 0;
    let codCalifAcademica = 0;

    /// Generar Alumnos && Acceso && ServiciosExternos && CalifAcademica
    for (let i = 0; i < NUMBER_OF_COHORTS; i++) {   
        for (let j = 0; j < NUMBER_OF_TITLES; j++) {  
            for (let k = 0; k < NUMBER_OF_STUDENTS_BY_COHORT; k++) { 
                
                generatedAccess.push(acceso.generateAcceso(cod));
                generatedStudents.push(alumno.generateAlumno(cod, generatedTitles[j], i, generatedAccess[cod]));
                generatedExternalServices.push(serviciosexternos.generateServiciosExternos(cod, generatedTitles[j]));
                
                const numMatriculas = getNumberOfMatriculas(generatedStudents[cod], generatedTitles[j]);
                
                
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
                    }

                    /// Generar CalifAcademica
                    let credsMatriculados = generatedInscription[codMatricula - 1][3];

                    if (credsMatriculados >= 12 && credsMatriculados < 24 && asigEspeciales[0] == 0)
                        asigEspeciales = [1, 0]
                    else if (credsMatriculados >= 24 && asigEspeciales[0] == 0 && asigEspeciales[1] == 0)
                        asigEspeciales = [1, 1]
                    else if (credsMatriculados >= 12 && asigEspeciales[0] != 0 && asigEspeciales[1] == 0)
                        asigEspeciales = [1, 1]

                    let contCredsMatr = 0;
                    let contCredsApro = generatedInscription[codMatricula - 1][2];

                    let siguienteMatricula = (l == numMatriculas) ? null : generatedInscription[codMatricula];

                    for (let m = 0; m < generatedTitles[j][1]; m++) {   // Recorre todas las asignaturas

                        if (asigAprobadas[m] == false) {
                            let vaAAprobar = (siguienteMatricula != null && 
                                                    contCredsApro + generatedSubjects[asignaurasPorTitulacion[j][m]][4] <= siguienteMatricula[2]) 
                                                        ? true : false;

                            
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

                            if (vaAAprobar) {
                                contCredsApro += generatedSubjects[asignaurasPorTitulacion[j][m]][4];
                                asigAprobadas[m] = true;
                            }
                            
                            contCredsMatr += generatedSubjects[asignaurasPorTitulacion[j][m]][4];
                            
                            if (contCredsMatr == credsMatriculados) 
                                break;
                        }
                    } 

                    if (l != numMatriculas)
                        codMatricula++; 
                }

                cod++;
            }
        }
        
        
    }

    disconnectDatabase();
});