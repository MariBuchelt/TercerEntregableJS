let continuar = true;
const coeficienteProteina = 1.6; 
let edad;
let peso;
let altura;
let sexo;
let nivelActividad;
let gastoEnergeticoTotalAprox;

function calcularGEB(edad, peso, altura) {
    let geb = 10 * peso + 6.25 * altura - 5 * edad;
    return geb;
}
 
const calcularGastoEnergeticoTotal = (geb, sexo) => {
  if(sexo === 'masculino') {
    console.log("El sexo ingresado es masculino.");
    return geb + 5;
  } else {
    if (sexo !== 'femenino') {
        console.log('Sexo no válido. Se aplicará la fórmula para el sexo feminino por defecto.');
    } else{
        console.log("El sexo ingresado es femenino.");
    }
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

do {
    for (let i = 0; i < 3; i++) {
        edad = Number(prompt("Calculadora de Gasto Energético Basal (GEB)! \n Ingrese tu edad: "));
        peso = parseFloat(prompt("Ingrese tu peso en kg: "));
        altura = parseFloat(prompt("Ingrese tu altura en cm: "));
        sexo = prompt("Ingrese tu sexo (masculino/femenino): ").toLocaleLowerCase();
        nivelActividad = prompt("Ingrese tu nivel de actividad física (1-4): \n 1. Sedentario \n 2. Ligera \n 3. Moderada \n 4. Intensa ");
        let geb = calcularGEB(edad, peso, altura);
        let gastoEnergeticoTotal = calcularGastoEnergeticoTotal(geb, sexo)
        
        if (gastoEnergeticoTotal === null) {
            console.log("Sexo no válido. ");
            gastoEnergeticoTotalAprox = calcularGEB(edad, peso, altura);
            console.log("Gasto Energético Total (GET) aproximado sin tener en cuenta el sexo: " + gastoEnergeticoTotalAprox + " kcal/día");
        } else {
        console.log("Gasto Energético Total (GET): " + gastoEnergeticoTotal + " kcal/día");
        }
        
        let proteina = calcularProteina(peso, coeficienteProteina);
        console.log("Recomendación de proteína: " + proteina.toFixed(2) + " g/día");
        console.log("Esto solo es un estimado, para obtener resultados más precisos, consulte a un profesional de la salud o nutricionista.");

    }

    if (continuar) {
        let confirmacion = prompt("¿Desea continuar jugando? (si/no)").toLocaleLowerCase();
        if (confirmacion == "no") {
            continuar = false;
        }
    }
   
} while (continuar);
