let continuar = true;
const coeficienteProteina = 1.6; 
let nombre;
let edad;
let peso;
let altura;
let sexo;
let nivelActividad;
const personas = [];

function calcularGEB(edad, peso, altura) {
    let geb = 10 * peso + 6.25 * altura - 5 * edad;
    return geb;
}

const calcularGastoEnergeticoTotal = (geb, sexo) => {
  if(sexo === 'masculino') {
    console.log("El sexo ingresado es masculino.");
    return geb + 5;
  } else {
    console.log("El sexo ingresado es femenino.");
    return geb - 161;
  }
};

const calcularProteina = (peso, coeficienteProteina) =>  peso * coeficienteProteina;

function calcularSegunActividadFisica(gastoEnergeticoTotal, nivelActividad) {
    let multiplicador;
    switch(nivelActividad) {
        case '1':
            multiplicador = 1.2;
            console.log("Seleccionaste 1");
            break; 
        case '2':
            multiplicador = 1.375;
            console.log("Seleccionaste 2"); 
            break;
        case '3':   
            multiplicador = 1.55;
            console.log("Seleccionaste 3");
            break;
        case '4':
            multiplicador = 1.725;   
            console.log("Seleccionaste 4");
            break;
        default:
            multiplicador = 1.2;
            console.log("Seleccionaste una opción no válida, se aplicará el multiplicador para nivel sedentario (1.2)");
            break;
    }
    return gastoEnergeticoTotal * multiplicador;
}

function listarPersonas(lista) {
    let mensaje = "Personas cargadas: \n";
    for (const persona of lista) {
        mensaje += `${persona}\n`;
    }
    mensaje += `Total: ${lista.length} personas`;
    alert(mensaje);
}

function gestionarPersonas() {
    let opcion;
    let buscado;
    let posicion;
    let nuevoNombre;

    do {
        opcion = prompt("¿Qué querés hacer con la lista de personas? \n 1. Ver lista \n 2. Buscar persona \n 3. Eliminar última persona \n 4. Reemplazar nombre \n 5. Seguir");
        switch (opcion) {
            case '1':
                listarPersonas(personas);
                break;
            case '2':
                buscado = prompt("¿A quién querés buscar?").toLocaleLowerCase();
                if (personas.includes(buscado)) {
                    posicion = personas.indexOf(buscado);
                    alert(`"${buscado}" está en la lista, en la posición ${posicion}`);
                } else {
                    alert(`"${buscado}" no está en la lista.`);
                }
                break;
            case '3':
                if (personas.length === 0) {
                    alert("La lista está vacía.");
                } else {
                    const eliminada = personas.pop();
                    alert(`Se eliminó a: ${eliminada}`);
                }
                break;
            case '4':
                buscado = prompt("¿Qué nombre querés reemplazar?").toLocaleLowerCase();
                posicion = personas.indexOf(buscado);
                if (posicion === -1) {
                    alert(`"${buscado}" no está en la lista.`);
                } else {
                    nuevoNombre = prompt("Ingrese el nuevo nombre: ").toLocaleLowerCase();
                    personas.splice(posicion, 1, nuevoNombre);
                    alert(`Se reemplazó "${buscado}" por "${nuevoNombre}"`);
                }
                break;
            case '5':
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    } while (opcion !== '5');
}

do {
        nombre = prompt("Calculadora de Gasto Energético Basal (GEB)! \n Ingrese tu nombre: ").toLocaleLowerCase();
        while (nombre === "" || !isNaN(nombre)) {
            alert("Nombre no válido. Ingrese un nombre.");
            nombre = prompt("Ingrese tu nombre: ").toLocaleLowerCase();
        }
        edad = Number(prompt("Calculadora de Gasto Energético Basal (GEB)! \n Ingrese tu edad: "));
        while (isNaN(edad) || edad <= 0) {
            alert("Edad no válida. Ingrese un número.");
            edad = Number(prompt("Ingrese tu edad: "));
        }
        peso = parseFloat(prompt("Ingrese tu peso en kg: "));
        while (isNaN(peso) || peso <= 0) {
            alert("Peso no válido. Ingrese un número.");
            peso = parseFloat(prompt("Ingrese tu peso en kg: "));
        }
        altura = parseFloat(prompt("Ingrese tu altura en cm: "));
        while (isNaN(altura) || altura <= 0) {
            alert("Altura no válida. Ingrese un número.");
            altura = parseFloat(prompt("Ingrese tu altura en cm: "));
        }
        sexo = prompt("Ingrese tu sexo (masculino/femenino): ").toLocaleLowerCase();
        while (sexo !== "masculino" && sexo !== "femenino") {
            alert("Sexo no válido. Ingrese 'masculino' o 'femenino'.");
            sexo = prompt("Ingrese tu sexo (masculino/femenino): ").toLocaleLowerCase();
        }
        nivelActividad = prompt("Ingrese tu nivel de actividad física (1-4): \n 1. Sedentario \n 2. Ligera \n 3. Moderada \n 4. Intensa ");
   
        let geb = calcularGEB(edad, peso, altura);
        let gastoEnergeticoAprox = calcularGastoEnergeticoTotal(geb, sexo);
        let gastoEnergeticoTotal = calcularSegunActividadFisica(gastoEnergeticoAprox, nivelActividad);
        alert("Gasto Energético Total (GET): " + gastoEnergeticoTotal + " kcal/día");
        
        let proteina = calcularProteina(peso, coeficienteProteina);
        alert("Recomendación de proteína: " + proteina.toFixed(2) + " g/día");
        console.log("Esto solo es un estimado, para obtener resultados más precisos, consulte a un profesional de la salud o nutricionista.");

        personas.push(nombre);
        gestionarPersonas();

    if (continuar) {
        let confirmacion = prompt("¿Desea continuar jugando? (si/no)").toLocaleLowerCase();
        if (confirmacion == "no") {
            continuar = false;
        }
    }
   
} while (continuar);
