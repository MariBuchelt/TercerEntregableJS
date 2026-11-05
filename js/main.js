let continuar = true;
const coeficienteProteina = 1.6; 
let nombre;
let edad;
let peso;
let altura;
let sexo;
let nivelActividad;

class Persona {
    constructor(nombre, edad, peso, altura, sexo) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso; 
        this.altura = altura;
        this.sexo = sexo;
    }

    presentarse() {
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años, mido ${this.altura} cm y mi sexo es ${this.sexo}.`;
    }

    mostrarDatos() {
        return `${this.nombre}, edad: ${this.edad}, peso: ${this.peso} kg, altura: ${this.altura} cm, sexo: ${this.sexo}`;
    }

    alturaEnMetros() {
        return this.altura / 100;
    }

}

const persona1 = new Persona('Ana', 28, 60, 165, 'femenino');
const persona2 = new Persona('Juan', 35, 80, 180, 'masculino');
const persona3 = new Persona('María', 22, 55, 158, 'femenino');
const persona4 = new Persona('Pedro', 40, 90, 175, 'masculino');
const personas = [persona1, persona2, persona3, persona4];


console.log(persona1.presentarse());
console.log(persona2.presentarse());
console.log(persona3.presentarse());
console.log(persona4.presentarse());
console.log(`${persona1.nombre} mide ${persona1.alturaEnMetros()} metros.`);
console.log(`${persona2.nombre} mide ${persona2.alturaEnMetros()} metros.`);
console.log(`${persona3.nombre} mide ${persona3.alturaEnMetros()} metros.`);
console.log(`${persona4.nombre} mide ${persona4.alturaEnMetros()} metros.`);


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
    let numero = 1;
    for (const persona of lista) {
        mensaje += `${numero}. ${persona.mostrarDatos()}\n`;
        numero++;
    }
    mensaje += `Total: ${lista.length} personas`;
    alert(mensaje);
}

function buscarPosicion(nombreBuscado) {
    return personas.findIndex((persona) => persona.nombre === nombreBuscado);
}

function pedirDatosPersona() {
    let nuevoNombre = prompt("Ingrese el nombre: ");
    while (nuevoNombre === "" || !isNaN(nuevoNombre)) {
        alert("Nombre no válido. Ingrese un nombre.");
        nuevoNombre = prompt("Ingrese el nombre: ");
    }
    let nuevaEdad = Number(prompt("Ingrese la edad: "));
    while (isNaN(nuevaEdad) || nuevaEdad <= 0) {
        alert("Edad no válida. Ingrese un número.");
        nuevaEdad = Number(prompt("Ingrese la edad: "));
    }
    let nuevoPeso = parseFloat(prompt("Ingrese el peso en kg: "));
    while (isNaN(nuevoPeso) || nuevoPeso <= 0) {
        alert("Peso no válido. Ingrese un número.");
        nuevoPeso = parseFloat(prompt("Ingrese el peso en kg: "));
    }
    let nuevaAltura = parseFloat(prompt("Ingrese la altura en cm: "));
    while (isNaN(nuevaAltura) || nuevaAltura <= 0) {
        alert("Altura no válida. Ingrese un número.");
        nuevaAltura = parseFloat(prompt("Ingrese la altura en cm: "));
    }
    let nuevoSexo = prompt("Ingrese el sexo (masculino/femenino): ").toLowerCase();
    while (nuevoSexo !== "masculino" && nuevoSexo !== "femenino") {
        alert("Sexo no válido. Ingrese 'masculino' o 'femenino'.");
        nuevoSexo = prompt("Ingrese el sexo (masculino/femenino): ").toLowerCase();
    }
    return new Persona(nuevoNombre, nuevaEdad, nuevoPeso, nuevaAltura, nuevoSexo);
}

function gestionarPersonas() {
    let opcion;
    let buscado;
    let posicion;

    do {
        opcion = prompt("¿Qué querés hacer con la lista de personas? \n 1. Ver lista \n 2. Buscar persona \n 3. Agregar persona \n 4. Eliminar persona \n 5. Reemplazar persona \n 6. Seguir");
        switch (opcion) {
            case '1':
                listarPersonas(personas);
                break;
            case '2':
                buscado = prompt("¿A quién querés buscar?");
                posicion = buscarPosicion(buscado);
                if (posicion === -1) {
                    alert(`"${buscado}" no está en la lista.`);
                } else {
                    alert(`Encontrado en la posición ${posicion}: \n${personas[posicion].mostrarDatos()}`);
                }
                break;
            case '3':
                const nuevaPersona = pedirDatosPersona();
                personas.push(nuevaPersona);
                alert(`Se agregó a: \n${nuevaPersona.mostrarDatos()}`);
                break;
            case '4':
                buscado = prompt("¿A quién querés eliminar?");
                posicion = buscarPosicion(buscado);
                if (posicion === -1) {
                    alert(`"${buscado}" no está en la lista.`);
                } else {
                    const eliminada = personas.splice(posicion, 1)[0];
                    alert(`Se eliminó a: \n${eliminada.mostrarDatos()}`);
                }
                break;
            case '5':
                buscado = prompt("¿A quién querés reemplazar?");
                posicion = buscarPosicion(buscado);
                if (posicion === -1) {
                    alert(`"${buscado}" no está en la lista.`);
                } else {
                    alert("Ingrese los datos de la nueva persona.");
                    const reemplazo = pedirDatosPersona();
                    const anterior = personas[posicion];
                    personas.splice(posicion, 1, reemplazo);
                    alert(`Se reemplazó a: \n${anterior.mostrarDatos()} \npor: \n${reemplazo.mostrarDatos()}`);
                }
                break;
            case '6':
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    } while (opcion !== '6');
}

do {
        nombre = prompt("Calculadora de Gasto Energético Basal (GEB)! \n Ingrese tu nombre: ");
        while (nombre === "" || !isNaN(nombre)) {
            alert("Nombre no válido. Ingrese un nombre.");
            nombre = prompt("Ingrese tu nombre: ");
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
        alert("Gasto Energético Total (GET): " + gastoEnergeticoTotal.toFixed(2) + " kcal/día");
        
        let proteina = calcularProteina(peso, coeficienteProteina);
        alert("Recomendación de proteína: " + proteina.toFixed(2) + " g/día");
        console.log("Esto solo es un estimado, para obtener resultados más precisos, consulte a un profesional de la salud o nutricionista.");

        const usuario = new Persona(nombre, edad, peso, altura, sexo);
        console.log(usuario.presentarse());

        personas.push(usuario);
        gestionarPersonas();

    if (continuar) {
        let confirmacion = prompt("¿Desea calcular otro gasto energético? (si/no)").toLocaleLowerCase();
        if (confirmacion == "no") {
            continuar = false;
        }
    }
   
} while (continuar);
