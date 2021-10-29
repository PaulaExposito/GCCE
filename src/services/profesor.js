const Profesor = require('../models/Profesor')

// Database access methods

async function createProfesor(matriculaDTO) {
    console.log(matriculaDTO);
    console.log();
}


// Generate random data
const names = ["Paco", "Maria", "Lucia", "Roberto", "Lucas", "Pepe"];
const lastnames = ["Garcia", "Gonzalez", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin", "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Alvarez", "Muñoz", "Romero", "Alonso", "Gutierrez", "Navarro", "Torres", "Dominguez",
"Vazquez", "Ramos", "Gil", "Ramirez", "Serrano", "Blanco", "Suarez", "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marin", "Sanz", "Nuñez", "Iglesias", "Medina", "Garrido", "Santos", "Castillo", "Cortes", "Lozano", "Guerrero", "Cano", "Prieto", "Mendez", "Calvo", "Cruz", "Gallego", "Vidal", "Leon", "Herrera", "Marquez", "Peña", "Cabrera", "Flores", "Campos", "Vega", "Diez", "Fuentes", "Carrasco", "Caballero", "Nieto", "Reyes", "Aguilar", "Pascual", "Herrero", "Santana", "Lorenzo", "Hidalgo", "Montero", "Ibañez", "Gimenez", "Ferrer", "Duran", "Vicente", "Benitez", "Mora", "Santiago", "Arias", "Vargas", "Carmona", "Crespo", "Roman", "Pastor", "Soto", "Saez", "Velasco", "Soler", "Moya", "Esteban", "Parra", "Bravo", "Gallardo", "Rojas", "Pardo", "Merino", "Franco", "Espinosa", "Izquierdo", "Lara", "Rivas", "Silva", "Rivera", "Casado", "Arroyo", "Redondo", "Camacho", "Rey", "Vera", "Otero", "Luque", "Galan", "Montes", "Rios", "Sierra", "Segura", "Carrillo", "Marcos", "Marti", "Soriano", "Mendoza"];
const catego = ["Historia", "Filología", "Informática", "Matemáticas", "Física"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomIntFromIntervalCredits(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) * 6
}

function generateProfesor() {
    const yearBegin = randomIntFromInterval(2005,2021);
    const yearEnd = yearBegin + 1;
    createProfesor({
        //cod_prof: Number,
        asign_impartidas: randomIntFromInterval(1, 5),
        nom_prof: names[Math.floor(Math.random() * names.length)],
        apellido1: lastnames[Math.floor(Math.random() * lastnames.length)] ,
        apellido2: lastnames[Math.floor(Math.random() * lastnames.length)],
        catego: catego[Math.floor(Math.random() * catego.length)],
        year: yearBegin + "/" + yearEnd,
        tiempo_ull: randomIntFromInterval(1, 10),
        num_sexe: randomIntFromInterval(1, 10),
        sexe_act: randomIntFromInterval(1, 6),
    });
}

module.exports = {
    generateProfesor
}