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
const maleNames = ["Paco", "Roberto", "Lucas", "Pepe"];
const femaleNames = ["Maria", "Lucia", "Andrea"];
const lastnames = ["Garcia", "Gonzalez", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin", "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Alvarez", "Muñoz", "Romero", "Alonso", "Gutierrez", "Navarro", "Torres", "Dominguez",
"Vazquez", "Ramos", "Gil", "Ramirez", "Serrano", "Blanco", "Suarez", "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marin", "Sanz", "Nuñez", "Iglesias", "Medina", "Garrido", "Santos", "Castillo", "Cortes", "Lozano", "Guerrero", "Cano", "Prieto", "Mendez", "Calvo", "Cruz", "Gallego", "Vidal", "Leon", "Herrera", "Marquez", "Peña", "Cabrera", "Flores", "Campos", "Vega", "Diez", "Fuentes", "Carrasco", "Caballero", "Nieto", "Reyes", "Aguilar", "Pascual", "Herrero", "Santana", "Lorenzo", "Hidalgo", "Montero", "Ibañez", "Gimenez", "Ferrer", "Duran", "Vicente", "Benitez", "Mora", "Santiago", "Arias", "Vargas", "Carmona", "Crespo", "Roman", "Pastor", "Soto", "Saez", "Velasco", "Soler", "Moya", "Esteban", "Parra", "Bravo", "Gallardo", "Rojas", "Pardo", "Merino", "Franco", "Espinosa", "Izquierdo", "Lara", "Rivas", "Silva", "Rivera", "Casado", "Arroyo", "Redondo", "Camacho", "Rey", "Vera", "Otero", "Luque", "Galan", "Montes", "Rios", "Sierra", "Segura", "Carrillo", "Marcos", "Marti", "Soriano", "Mendoza"];
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


function generateAlumno(id) {
    const gender = randomGender();
    const student = {
        cod_alu: id,
        cod_titulo: titleCodesList[Math.floor(Math.random() * titleCodesList.length)],
        estado: titleStatus[Math.floor(Math.random() * titleStatus.length)],
        nom_alu: gender === "masculino" ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)],
        apellido1: lastnames[Math.floor(Math.random() * lastnames.length)],
        apellido2: lastnames[Math.floor(Math.random() * lastnames.length)],
        sexo: gender,
        year: randomIntFromInterval(FIRST_YEAR_DATA, LAST_YEAR_DATA),
        niv_est_prog1: educationalLevel[Math.floor(Math.random() * educationalLevel.length)],
        niv_est_prog2: educationalLevel[Math.floor(Math.random() * educationalLevel.length)],
        niv_renta: rentLevel[Math.floor(Math.random() * rentLevel.length)],
        municipio: townships[Math.floor(Math.random() * townships.length)],
        provincia: provinces[Math.floor(Math.random() * provinces.length)],
    }

    createAlumno(student);
    return student
}


module.exports = {
    generateAlumno
}
