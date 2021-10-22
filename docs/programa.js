/*import configparser
import json
import random
from re import X
import mariadb
import sys
from print_dict import pd

import math

from nombres import nombres, apellidos

from sklearn import datasets, linear_model

from joblib import dump, load

config = configparser.ConfigParser()
config.read('config.ini')


with open('tablas.json') as f {
		jsonFile = json.load(f)*/


// print(json.dumps(jsonFile, indent = 4, sort_keys=True))

/*n_asignaturas = int(config['DEFAULT']['n_asignaturas'])
n_alumnos_nuevos = int(config['DEFAULT']['n_alumnos_nuevos'])
p_abandono_year = float(config['DEFAULT']['p_abandono_year'])
n_profesores = int(config['DEFAULT']['n_profesores'])
n_cursos = int(config['DEFAULT']['n_cursos'])
n_titulaciones = int(config['DEFAULT']['n_titulaciones'])
creditos_por_asig = int(config['DEFAULT']['creditos_por_asig'])
n_cursos_simular = int(config['DEFAULT']['n_cursos_simular'])*/


// Funciones titulación

function asignaturas() {
	return [];
}

function cod_titul(tit) {
	return 1000 * tit;
}

function num_cursos() {
	return 4
}

function tip_estudios() {
	return random.choice(("master", "grado"));
}

function tip_titul() {
	return random.choice(("oficial", "no_oficial"));
}

function total_cred() {
	return n_asignaturas * creditos_por_asig;
}


function p_abandono() {
	return round(random.uniform(0.10, 0.50), 2);
}


// funciones asignatura

function dificultad() {
	return random.randint(1, 10);
}

function cod_titul_asig(tit) {
	return tit['cod_titul'];
}

function cod_asig(tit, n_asig) {
	return tit['cod_titul'] + n_asig;
}

function cred_asig(tit) {
	return tit['total_cred'] / n_asignaturas;
}

function nom_asig(tit, n_asig) {
	return 'asignatura_' + str(tit['cod_titul']) + "_" + str(n_asig);
}

function curso(tit, n_asig) {
	return int(math.ceil((n_asig) / (n_asignaturas / tit['num_cursos'])));
}

function cuatrimestre(tit, n_asig) {
	asig_por_curso = n_asignaturas / tit['num_cursos'];
	if ((n_asig - 1) % (asig_por_curso) < asig_por_curso / 2) {
		return "primero";
	}
	else {
		return "segundo";
	}
}

function tip_asig() {
	return random.choice(("Optativa", "Obligatoria"));
}

function especial() {
	return random.choice((True, False));
}

// funciones profesor
function p_aban_prof() {
	return random.uniform(0, 2);;
}

function asig_imp() {
	return [];
}

function cod_prof(prof) {
	return 1000 + prof;
}

function nom_prof() {
	return random.choice(nombres);
}

function apellido() {
	return random.choice(apellidos);
}

function catego(prof) {
	return "categoria_" + str(int(prof / 5));
}

function year() {
	return random.randint(1950, 1995);
}

function tiempo_ull() {
	return random.randint(0, 15);
}

function num_sexe(profesor) {
	return int(profesor['tiempo_ull'] / 6);
}

function sexe_act() {
	return random.randint(1, 10);
}


// Funciones alumno
function titulacion() {
	return None;
}

function asig_mat() {
	return [];
}

function asig_curs() {
	return [];
}

function ult_asig() {
	return 0;
}

function nota_pred() {
	return random.randint(5, 10);
}

function prob_aban(alum) {
	return 10 / pow(alum['nota_pred'], 2);
}

function cod_alu(alum) {
	return 1000 + alum;
}

function nom_alu() {
	return random.choice(nombres);
}

function sexo() {
	return random.choice(("M", "F"));
}

function yearalu() {
	return simulacion['datos']['curso'];
}

function niv_est_prog1() {
	return random.randint(1, 10);
}

function niv_est_prog2() {
	return random.randint(1, 10);
}

function niv_renta() {
	return random.choice(("Alto", "Medio", "Bajo"));
}

function isla() {
	return random.choice(("Tenerife", "Gran Canaria", "La Gomera", "La Palma", "El Hierro", "Lanzarote", "Fuerteventura"));
}


// Funciones acceso
function cod_alu_acc(alumno) {
	return alumno['cod_alu'];
}

function tip_acceso() {
	return "EBAU";
}

function nota_med_bas(alumno) {
	return round(max(5, min(10, random.uniform(-2, 2) + alumno['nota_pred'])), 2);
}

function nota_med_esp(alumno) {
	return round(max(5, min(10, random.uniform(-2, 2) + alumno['nota_pred'])), 2);
}

function nota_bach(alumno) {
	return round(max(5, min(10, random.uniform(-2, 2) + alumno['nota_pred'])), 2);
}

function nota_acceso(acceso) {
	return round((acceso['nota_bach'] * 0.6) + (0.4 * acceso['nota_med_bas']) + (0.4 * acceso['nota_med_esp']), 2);
}


// Funciones calificademica

function curso_cal() {
	return str(simulacion['datos']['curso']) + "-" + str(simulacion['datos']['curso'] % 100 + 1);
}

function cod_titul_cal(alum) {
	return simulacion['titulacion'][alum['titulacion']]['cod_titul'];
}

function cod_prof_cal(asig) {
	return simulacion['profesor'][asig['profesor']]['cod_prof'];
}

function cod_alu_cal(alum) {
	return alum['cod_alu'];
}

function cod_asig_cal(asig) {
	return asig['cod_asig'];
}

function convocatoria(conv) {
	return conv;
}

function calif_num(asig, alum) {
	inc = random.uniform(0, 3);
	prob = asig['dificultad'] / 10;

	if (random.uniform(0, 1) > prob);

	return round((random.uniform(0, 1) > prob) ? min(10, alum['nota_pred'] + inc) : max(0, alum['nota_pred'] - inc), 2);
}

function calif(calific) {
	cal = calific['calif_num'];

	if (cal < 5) {
		return "INS";
	} else if (cal < 7) {
		return "SUF";
	}
	else if (cal < 9) {
		return "NOT";
	}
	else {
		return "SOB";
	}
}
// print(json.dumps(simulacion['titulacion'], indent=4, sort_keys=False))


function inicia_simulacion() {

	simulacion = {};
	simulacion['titulacion'] = {};
	simulacion['alumno'] = {};
	simulacion['profesor'] = {};
	simulacion['acceso'] = {};
	simulacion['asignatura'] = {};
	simulacion['califacademica'] = {};
	simulacion['datos'] = {};

	simulacion['datos']['curso'] = int(2020);
	simulacion['datos']['lastalum'] = 1;
	simulacion['datos']['lastprof'] = 1;

	return simulacion;
}

function genera_titul() {
	// Generar titulaciones
	for (tit in range(1, n_titulaciones + 1)) {
		simulacion['titulacion']['titulacion_' + str(tit)] = {};
		for (campo in jsonFile['titulacion']) {
			simulacion['titulacion']['titulacion_' + str(tit)][campo] = eval(jsonFile['titulacion'][campo]['funcion']);
		}
	}
}

function genera_asig() {
	// Generar asignaturas para cada titulación
	for (titname, tit in simulacion['titulacion'].items()) {
		for (n_asig in range(1, n_asignaturas + 1)) {
			// print(simulacion)
			asigname = 'asignatura_' + '\/'; //dudoso
			str(tit['cod_titul']) + "_" + str(n_asig)
			tit['asignaturas'].append(asigname)
			simulacion['asignatura'][asigname] = {}
			for (campo in jsonFile['asignatura']) {
				simulacion['asignatura'][asigname][campo] = eval(
					jsonFile['asignatura'][campo]['funcion'])
			}
		}
	}
}

//	Generar profesores
function genera_prof() {
	prof_actual = {}
	for (profname, prof in simulacion['profesor'].items()) {
		if (prof['aban'] == False) {
			prof_actual[profname] = prof

			lastprof = simulacion['datos']['lastprof']

			for (prof in range(lastprof, (n_profesores + lastprof) - (len(prof_actual)))) {
				simulacion['profesor']['profesor_' + str(prof)] = {}
				profesor = simulacion['profesor']['profesor_' + str(prof)]
				for (campo in jsonFile['profesor']) {
					simulacion['profesor']['profesor_' +
						str(prof)][campo] = eval(jsonFile['profesor'][campo]['funcion'])
					simulacion['datos']['lastprof'] = prof
					prof_actual = {}
					for (profname, prof in simulacion['profesor'].items()) {
						if (prof['aban'] == False) {
							prof_actual[profname] = prof
						}
					}
				}
			}
		}
	}
}

// Generar cohorte ingreso

function genera_cohorte() {
	lastalum = simulacion['datos']['lastalum'];
	for (alum in range(lastalum, lastalum + n_alumnos_nuevos)) {
		simulacion['alumno']['alumno_' + str(alum)] = {}
		alumno = simulacion['alumno']['alumno_' + str(alum)]
		for (campo in jsonFile['alumno']) {
			simulacion['alumno']['alumno_' +
				str(alum)][campo] = eval(jsonFile['alumno'][campo]['funcion'])

			simulacion['acceso']['acceso_' + str(alumno['cod_alu'])] = {}
			acceso = simulacion['acceso']['acceso_' + str(alumno['cod_alu'])]
			for (campo in jsonFile['acceso']) {
				simulacion['acceso']['acceso_' + str(alumno['cod_alu'])][campo] = eval(
					jsonFile['acceso'][campo]['funcion'])
				simulacion['datos']['lastalum'] += n_alumnos_nuevos
			}
		}
	}
}


// Para cada curso a simular

function asig_por_prof() {
  // Asignaturas por profesor

  // Profesorado que no ha abandonado
	prof_actual = {}
	for (profname, prof in simulacion['profesor'].items()) {
		if (prof['aban'] == False) {
			prof_actual[profname] = prof

    // Asignaturas que no estan siendo impartidas
			asig_posibles = set()
			for (n_asig, asig in simulacion['asignatura'].items()) {
				if (asig['profesor'] === null) {
					asig_posibles.add(n_asig)

					calc = len(simulacion['asignatura']) / len(prof_actual)
					n_asig_prof = int( (calc).is_integer() ? calc : calc + 1)

					for (profname, prof in prof_actual.items()) {
						while (len(prof['asig_imp']) <= n_asig_prof) {
							if (len(asig_posibles) == 0) {
								break
								asigname = asig_posibles.pop()
								prof['asig_imp'].append(asigname)
								simulacion['asignatura'][asigname]['profesor'] = profname
							}
						}
					}
				}
			}
		}
	}
}

function asig_por_alum() {
// Asignaturas por alumno
	for (alumname, alum in simulacion['alumno'].items()) {
		if (alum['aban'] == False) {
			if (alum['titulacion'] == None) {
				alum['titulacion'] = random.choice(
					list(simulacion['titulacion']))
				alum['cod_titul'] = simulacion['titulacion'][alum['titulacion']]['cod_titul']

				titname = alum['titulacion']
				it = alum['ult_asig']
				titut = simulacion['titulacion'][titname]

				while (it < len(titut['asignaturas']) && len(alum['asig_mat']) < n_asignaturas / titut['num_cursos']) {
					alum['asig_mat'].append(titut['asignaturas'][it])
					it += 1

					alum['ult_asig'] = it


					convocatorias = [{
						"name" :
							"Enero",
							"cuatrimestre" :
								["primero"]
						},
						{
						"name" :
							"Junio",
							"cuatrimestre" :
								["segundo"]
						},
						{
						"name" :
							"Julio",
							"cuatrimestre" :
								["primero", "segundo"]
						},
						{
						"name" :
							"Septiembre",
							"cuatrimestre" :
								["primero", "segundo"]
					}]
				}
			}
		}
	}
}

// Generar calificaciones
function genera_calif() {

	for (convocatoria_ in convocatorias) {
		conv = convocatoria_["name"]
		completadas = []
		for (alumname, alum in simulacion['alumno'].items()) {
			aprobadas = []
			for (asigname in alum['asig_mat']) {
				asig = simulacion['asignatura'][asigname]

				if (asig["cuatrimestre"] in convocatoria_["cuatrimestre"]) {
					calname = "Curso_ " + str(simulacion['datos']['curso']) + "-" + str(
						simulacion['datos']['curso'] % 100 + 1) + "_" + str(asig['cod_asig']) + "_" + str(alum['cod_alu']) + "_" + conv
					simulacion['califacademica'][calname] = {}
					cal = simulacion['califacademica'][calname]
	// print(asig)
					for (campo in jsonFile['califacademica']) {
						simulacion['califacademica'][calname][campo] = eval(jsonFile['califacademica'][campo]['funcion'])

						if (simulacion['califacademica'][calname]['calif_num'] >= 5) {
							aprobadas.append(asigname)

	// Desmatricular de asignaturas aprobadas
							for (aprob in aprobadas) {
								alum['asig_mat'].remove(aprob)
								alum['n_aprob'] += 1

								if (alum['n_aprob'] == len(simulacion['titulacion'][alum['titulacion']]['asignaturas'])) {
									print("Alumno " + alumname +
										" completa la titulacion " + alum['titulacion'])
									completadas.append(alumname)
								}
							}
						}
					}
				}
			}
		}
	}
}

// for alumname in completadas {
//     del simulacion['alumno'][alumname]


// Abandono alumnos
function abandono_alu() {
	for (alumname, alum in simulacion['alumno'].items()) {
		tit_aban = simulacion['titulacion'][alum['titulacion']]['p_abandono']
		alum_aban = alum['prob_aban']
		asig_susp = len(alum['asig_mat'])

		prob = (asig_susp / 10 + alum_aban + tit_aban + p_abandono_year) / 4

		if (random.uniform(0, 1) < prob) {
			alum['aban'] = True
			alum['asig_mat'] = []
			print("Alumno " + alumname + " abandona")
		}
	}
}

// Abandono profesorado
function aban_prof() {
	for (profname, prof in simulacion['profesor'].items()) {
		if (random.uniform(0, 1) < prof['p_aban']) {
			prof['aban'] = True
			print("Profesor " + profname + " abandona")
			for (asigname in prof['asig_imp']) {
				simulacion['asignatura'][asigname]['profesor'] = None
			}
			prof['asig_imp'].clear()
		}
	}
}

function carga_simulacion(file) {
	/*with open(file) as f {
		return json.load(f)
	}*/
}


function entrenar_modelos() {
	print("Entrenando Modelos");
	//Entrenar un modelo de regresion lineal para cada asignatura
	//utilizando las notas de las asignaturas del cuatrimentre pasado(o acceso en caso de ser primer cuatri)

	//Obtener las notas de cada alumno
	notas = {}
	for (califname, calif in simulacion["califacademica"].items()) {
		cod_alu = calif["cod_alu"]
		if (notas.get(cod_alu, None) == None) {
			notas[cod_alu] = {}
			notas[cod_alu][calif["cod_asig"]] = calif["calif_num"]
		}
	}


//Incluir nota de acceso
	for (accesoname, acceso in simulacion["acceso"].items()) {
		cod_alu = acceso["cod_alu"]
		if (notas.get(cod_alu, None) == None) {
			notas[cod_alu] = {}
			notas[cod_alu]["acceso"] = acceso["nota_acceso"]
		}
	}




//Para cada asignatura de cada titulacion
	for (titname, tit in simulacion['titulacion'].items()) {
		for (asig in tit['asignaturas']) {
			X = []
			y = []
			cod_asig = simulacion["asignatura"][asig]['cod_asig']


			for (cod_alu, nota in notas.items()) {
				//Si el alumno se ha presentado a esta asignatura
				if (nota.get(cod_asig, None) != None) {
					asig_cuatri = (n_asignaturas / n_cursos) / 2

					resto = ((cod_asig - 1) % asig_cuatri)

					max_asig = int(cod_asig - resto)

					y.append(nota.get(cod_asig))
					X.append([])
					X[-1].append(nota["acceso"])
					//Para cada asignatura desde la primera de la titulacion hasta la del último cuatrimestre de la asignatura
					//Si el alumno no se ha presentado a la asignatura se toma como un cero
					first_asig = simulacion["asignatura"][tit["asignaturas"][0]]["cod_asig"]
					for (cod in range(first_asig, max_asig)) {
						X[-1].append(nota.get(cod, 0))
					}
				}
			}

			if (len(X) >= 1) {
				reg = linear_model.LinearRegression()
				reg.fit(X, y)
				dump(reg, "models/" + str(cod_asig))
			}
		}
	}

	print("Modelos entrenados")
}




	/*function exportar_bbdd() {
		try {
			conn = mariadb.connect(
				user = "admin",
				password = "password",
				host = "127.0.0.1",
				port = 3306,
				database = "datos_universidad"

			)
except mariadb.Error as e {
				print(f"Error connecting to MariaDB Platform { {e}")
				sys.exit(1)

// Get Cursor
				print("Connectado")

				cur = conn.cursor()

// Borrar las tablas antiguas
				tablas = []
				for tabla in jsonFile {
					tablas.append(tabla)

					i = len(tablas) - 1
					while i >= 0 {
						cur.execute("DELETE FROM " + tablas[i])
						i -= 1

						for tabla in jsonFile {
							for filaname, fila in simulacion[tabla].items() {
								campos = ""
								valores = []
								for campo, valor in fila.items() {
									if jsonFile[tabla][campo]['registrable'] == True {
										campos += campo + ","
										valores.append(valor)

//print("INSERT INTO " + tabla + " (" + campos[{- 1] + ") VALUES " + str(tuple(valores)))
										try {
											cur.execute("INSERT INTO " + tabla + " (" +
												campos[{- 1] + ") VALUES " + str(tuple(valores)))
except Exception as e {
												print("Ex { " + str(e) + "\n" + "INSERT INTO " + tabla +
													" (" + campos[{- 1] + ") VALUES " + str(tuple(valores)))
												sys.exit(1)

												cur.execute('COMMIT')*/


simulacion = inicia_simulacion()
//simulacion = carga_simulacion('simulacion.json')

genera_titul()
genera_asig()

for (curso in range(0, n_cursos_simular)) {
	simulacion['datos']['curso'] += 1
	genera_prof()
	genera_cohorte()
	asig_por_prof()
	asig_por_alum()
	genera_calif()
	abandono_alu()
	aban_prof()
}

	/*with open('simulacion.json', 'w', encoding = 'utf-8') as f {
		json.dump(simulacion, f, ensure_ascii = False, indent = 4)
	}*/

	exportar_bbdd()
	entrenar_modelos()
