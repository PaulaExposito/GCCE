const Alumno = require('../models/Alumno');

const FIRST_YEAR_DATA = 1995;
const LAST_YEAR_DATA = 2021;


// Database access methods

async function createAlumno(alumnoDTO) {
    console.log(alumnoDTO);
    console.log();
    // if (alumnoDTO == null)  return;
    // const alumno = new Alumno(alumnoDTO);
    // await alumno.save();
}

async function getAllAlumnos() {
    const alumnos = await Alumno.find();
    console.log(alumnos);
}

async function removeAllAlumnos() {
    await Alumno.remove({});
}


// Generate random data

const titleCodesList = [0, 1, 2, 3, 4, 5, 6]; // TODO: coger títulos que existan (habría que crear primero las titulaciones)
const titleStatus = ["activo", "pausado", "graduado", "abandono"];
const names = ["Paco", "Maria", "Lucia", "Roberto", "Lucas", "Pepe"];
const lastnames = ["Diaz", "Lopez", "Plata", "Anchieta", "Arroyo", "Perez"];
const gender = ["masculino", "femenino", "otro", "-"];
const educationalLevel = ["analfabeto", "primaria", "eso/egb", "bachillerato", "ciclo medio", "ciclo superior", "universitario"];
const rentLevel = ["bajo", "medio", "alto"];
const townships = ["La Orotava", "La Laguna", "La Victoria", "El Rosario", "Garachico"];
const provinces = ["Santa Cruz de Tenerife", "Cadiz", "Zaragoza"];


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomGender() {
    const randomNumber = randomIntFromInterval(1, 10) % 3;
    if (randomNumber == 0)
        return "masculino";
    else if (randomNumber == 1)
        return "femenino";
    else {
        return gender[Math.floor(Math.random() * gender.length)];
    }
}


function generateAlumno() {
    createAlumno({
        cod_alu: 0,
        cod_titulo: titleCodesList[Math.floor(Math.random() * titleCodesList.length)],
        estado: titleStatus[Math.floor(Math.random() * titleStatus.length)],
        nom_alu: names[Math.floor(Math.random() * names.length)],
        apellido1: lastnames[Math.floor(Math.random() * lastnames.length)],
        apellido2: lastnames[Math.floor(Math.random() * lastnames.length)],
        sexo: randomGender(),
        year: randomIntFromInterval(FIRST_YEAR_DATA, LAST_YEAR_DATA),
        niv_est_prog1: educationalLevel[Math.floor(Math.random() * educationalLevel.length)],
        niv_est_prog2: educationalLevel[Math.floor(Math.random() * educationalLevel.length)],
        niv_renta: rentLevel[Math.floor(Math.random() * rentLevel.length)],
        municipio: townships[Math.floor(Math.random() * townships.length)],
        provincia: provinces[Math.floor(Math.random() * provinces.length)],
    });
}


module.exports = {
    generateAlumno
}
