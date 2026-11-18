const coeficienteProteina = 1.6;
const nivelesActividad = ["", "Sedentario", "Ligera", "Moderada", "Intensa"];
let proximoId = 1;

class Persona {
    constructor(nombre, edad, peso, altura, sexo, nivelActividad) {
        this.id = proximoId;
        proximoId++;
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
        this.altura = altura;
        this.sexo = sexo;
        this.nivelActividad = nivelActividad;
    }

    alturaEnMetros() {
        return this.altura / 100;
    }
}
 
const personas = [
    new Persona("Ana", 28, 60, 165, "femenino", "2"),
    new Persona("Juan", 35, 80, 180, "masculino", "3"),
    new Persona("María", 22, 55, 158, "femenino", "1"),
    new Persona("Pedro", 40, 90, 175, "masculino", "4"),
];

const formulario = document.getElementById("formPersona");
const inputNombre = document.getElementById("nombre");
const inputEdad = document.getElementById("edad");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const selectSexo = document.getElementById("sexo");
const selectActividad = document.getElementById("nivelActividad");
const erroresFormulario = document.getElementById("erroresFormulario");
const contenedorPersonas = document.getElementById("contenedorPersonas");
const estadisticas = document.getElementById("estadisticas");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const filtroSexo = document.querySelector("#filtroSexo");

function calcularGEB(edad, peso, altura) {
    let geb = 10 * peso + 6.25 * altura - 5 * edad;
    return geb;
}

const calcularGastoEnergeticoTotal = (geb, sexo) => {
    if (sexo === "masculino") {
        return geb + 5;
    } else {
        return geb - 161;
    }
};


const calcularProteina = (peso) => peso * coeficienteProteina;

function calcularSegunActividadFisica(gastoEnergeticoTotal, nivelActividad) {
    let multiplicador;
    switch(nivelActividad) {
        case '1':
            multiplicador = 1.2;
            break;
        case '2':
            multiplicador = 1.375;
            break;
        case '3':
            multiplicador = 1.55;
            break;
        case '4':
            multiplicador = 1.725;
            break;
        default:
            multiplicador = 1.2;
    }
    return gastoEnergeticoTotal * multiplicador;
}

function calcularGET(persona) {
    const geb = calcularGEB(persona.edad, persona.peso, persona.altura);
    const gasto = calcularGastoEnergeticoTotal(geb, persona.sexo);
    return calcularSegunActividadFisica(gasto, persona.nivelActividad);
}

function calcularIMC(persona) {
    const metros = persona.alturaEnMetros();
    return persona.peso / (metros * metros);
}

function calcularPromedios() {
    const totales = personas.reduce((acumulador, persona) => {
        acumulador.edad += persona.edad;
        acumulador.peso += persona.peso;
        acumulador.altura += persona.altura;
        return acumulador;
    }, { edad: 0, peso: 0, altura: 0 });

    const cantidad = personas.length;
    return {
        edad: (totales.edad / cantidad).toFixed(1),
        peso: (totales.peso / cantidad).toFixed(1),
        altura: (totales.altura / cantidad).toFixed(1),
    };
}

const esTextoValido = (texto) => texto !== "" && isNaN(texto);
const esNumeroPositivo = (numero) => !isNaN(numero) && numero > 0;

function validarDatos(nombre, edad, peso, altura, sexo) {
    let errores = "";
    if (!esTextoValido(nombre)) {
        errores += "<li>Nombre no válido.</li>";
    }
    if (!esNumeroPositivo(edad)) {
        errores += "<li>Edad no válida.</li>";
    }
    if (!esNumeroPositivo(peso)) {
        errores += "<li>Peso no válido.</li>";
    }
    if (!esNumeroPositivo(altura)) {
        errores += "<li>Altura no válida.</li>";
    }
    if (sexo === "") {
        errores += "<li>Seleccioná un sexo.</li>";
    }
    return errores;
}

function mostrarMensaje(texto, tipo) {
    mensaje.innerText = texto;
    mensaje.className = "mensaje " + tipo;
    mensaje.hidden = false;
}

function renderizarPersonas(lista) {
    contenedorPersonas.innerHTML = "";

    if (lista.length === 0) {
        contenedorPersonas.innerHTML = `<p class="vacio">No hay personas para mostrar.</p>`;
        return;
    }

    lista.forEach((persona) => {
        contenedorPersonas.innerHTML += `
            <article class="tarjeta ${persona.sexo}" id="persona-${persona.id}">
                <h3>${persona.nombre}</h3>
                <p class="detalle">${persona.edad} años - ${persona.peso} kg - ${persona.altura} cm</p>
                <p class="detalle">Actividad: ${nivelesActividad[persona.nivelActividad]}</p>
                <div class="resultados">
                    <p><strong>${calcularGET(persona).toFixed(0)}</strong>kcal/día</p>
                    <p><strong>${calcularProteina(persona.peso).toFixed(0)} g</strong>proteína</p>
                    <p><strong>${calcularIMC(persona).toFixed(1)}</strong>IMC</p>
                </div>
                <button class="boton boton-peligro boton-eliminar" id="${persona.id}">Eliminar</button>
            </article>
        `;
    });

    const botonesEliminar = document.querySelectorAll(".boton-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
            eliminarPersona(Number(boton.id));
        });
    });
}

function renderizarEstadisticas() {
    if (personas.length === 0) {
        estadisticas.innerHTML = "";
        return;
    }
    const promedios = calcularPromedios();
    estadisticas.innerHTML = `
        <div class="estadistica"><span>Personas</span><strong>${personas.length}</strong></div>
        <div class="estadistica"><span>Edad promedio</span><strong>${promedios.edad}</strong></div>
        <div class="estadistica"><span>Peso promedio</span><strong>${promedios.peso} kg</strong></div>
        <div class="estadistica"><span>Altura promedio</span><strong>${promedios.altura} cm</strong></div>
    `;
}

function filtrarPersonas() {
    const texto = buscador.value.toLowerCase();
    const sexo = filtroSexo.value;
    return personas.filter((persona) => {
        const coincideNombre = persona.nombre.toLowerCase().includes(texto);
        const coincideSexo = sexo === "todos" || persona.sexo === sexo;
        return coincideNombre && coincideSexo;
    });
}

function actualizarVista() {
    renderizarPersonas(filtrarPersonas());
    renderizarEstadisticas();
}

function eliminarPersona(id) {
    const persona = personas.find((p) => p.id === id);
    const indice = personas.indexOf(persona);
    personas.splice(indice, 1);
    actualizarVista();
    mostrarMensaje(`Se eliminó a ${persona.nombre}.`, "error");
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    const edad = Number(inputEdad.value);
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);
    const sexo = selectSexo.value;
    const nivelActividad = selectActividad.value;
    const errores = validarDatos(nombre, edad, peso, altura, sexo);
    erroresFormulario.innerHTML = errores;

    if (errores !== "") {
        return;
    }

    const nuevaPersona = new Persona(nombre, edad, peso, altura, sexo, nivelActividad);
    personas.push(nuevaPersona);
    formulario.reset();
    actualizarVista();

    const tarjetaNueva = document.getElementById(`persona-${nuevaPersona.id}`);
    if (tarjetaNueva) {
        tarjetaNueva.classList.add("resaltada");
    }
    
    mostrarMensaje(
        `Se agregó a ${nuevaPersona.nombre}. Gasto Energético Total: ${calcularGET(nuevaPersona).toFixed(0)} kcal/día`,
        "exito"
    );
});

buscador.addEventListener("keyup", actualizarVista);
filtroSexo.addEventListener("change", actualizarVista);
actualizarVista();
