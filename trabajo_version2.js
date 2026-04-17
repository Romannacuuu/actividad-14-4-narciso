"use strict";
// ============ MANTENGO TUS CLASES ORIGINALES ============
class Turbina {
    numTurbinas = 0;
    constructor(n) {
        this.numTurbinas = n;
    }
    ToString() {
        return this.numTurbinas + " Turbina/s";
    }
}
class Helice {
    numHelices = 0;
    constructor(n) {
        this.numHelices = n;
    }
    ToString() {
        return this.numHelices + " hélice/s";
    }
}
class TrendeAterrizaje {
    numNeumaticos = 0;
    numAmortiguadores = 0;
    fijoRetractil = false;
    constructor(a, b, c) {
        this.numNeumaticos = a;
        this.numAmortiguadores = b;
        this.fijoRetractil = c;
    }
    ToString() {
        let mensaje = "Tren de Aterrizaje compuesto por: ";
        if (this.fijoRetractil) {
            mensaje += " con Retractil fijo, ";
        }
        mensaje += this.numNeumaticos + " neumáticos, " + this.numAmortiguadores + " amoriguadores ";
        return mensaje;
    }
}
class Cubierta {
    cabinaTripulacion = false;
    cabinaVuelo = false;
    sistemaEmergencia = false;
    numTanquesCombustible = 0;
    numPuertasSalidas = 0;
    constructor(pCabinaTripulacion, pCabinaVuelo, pSistemaEmergencia, pTanquesCombustible, pPuertasSalida) {
        this.cabinaTripulacion = pCabinaTripulacion;
        this.cabinaVuelo = pCabinaVuelo;
        this.sistemaEmergencia = pSistemaEmergencia;
        this.numTanquesCombustible = pTanquesCombustible;
        this.numPuertasSalidas = pPuertasSalida;
    }
    ToString() {
        let mensaje = "Cubierta compuesta de: ";
        if (this.cabinaVuelo) {
            mensaje += " Cubierta de Vuelo, ";
        }
        if (this.cabinaTripulacion) {
            mensaje += " Cubierta de Tripulación, ";
        }
        if (this.sistemaEmergencia) {
            mensaje += " Sistema de Emergencia, ";
        }
        mensaje += this.numTanquesCombustible + " Tanques de Combustible, ";
        mensaje += this.numPuertasSalidas + " Puertas de Salida.";
        return mensaje;
    }
}
class Alas {
    numAlasFrente = 0;
    numAlasCola = 0;
    constructor(mAlasFrente, nAlasCola) {
        this.numAlasFrente = mAlasFrente;
        this.numAlasCola = nAlasCola;
    }
    ToString() {
        return "Alas Frontales: " + this.numAlasFrente + " Alas Posteriore: " + this.numAlasCola;
    }
}
// ============ NUEVAS CLASES QUE AÑADEN LAS RELACIONES FALTANTES ============
// 1. HERENCIA - Clase base para demostración
class VehiculoAereo {
    modelo;
    constructor(modelo) {
        this.modelo = modelo;
    }
}
// 2. HERENCIA - AeroplanoDeCarga ES UN VehiculoAereo
class AeroplanoDeCarga extends VehiculoAereo {
    capacidadCarga;
    constructor(modelo, capacidad) {
        super(modelo);
        this.capacidadCarga = capacidad;
    }
    despegar() {
        return `${this.modelo} (carga: ${this.capacidadCarga}tn) despegando`;
    }
}
// 3. ASOCIACIÓN - Piloto con Aeroplano
class Piloto {
    nombre;
    aeroplanoAsignado;
    constructor(nombre) {
        this.nombre = nombre;
    }
    asignarAeroplano(aeroplano) {
        this.aeroplanoAsignado = aeroplano;
        console.log(`${this.nombre} asignado al aeroplano`);
    }
    volar() {
        if (this.aeroplanoAsignado) {
            return `${this.nombre} vuela: ${this.aeroplanoAsignado.ToString()}`;
        }
        return `${this.nombre} sin aeroplano`;
    }
}
// 4. DEPENDENCIA - Servicio de mantenimiento
class ServicioMantenimiento {
    revisarHelice(helice) {
        return `Revisando ${helice.ToString()}`;
    }
}
// 5. AGREGACIÓN - Hangar que contiene aeroplanos
class Hangar {
    nombre;
    aeroplanos = [];
    constructor(nombre) {
        this.nombre = nombre;
    }
    agregarAeroplano(aeroplano) {
        this.aeroplanos.push(aeroplano);
        console.log(`Aeroplano agregado al hangar ${this.nombre}`);
    }
    listarAeroplanos() {
        console.log(`Hangar ${this.nombre} tiene ${this.aeroplanos.length} aeroplanos`);
    }
}
// ============ CLASE AEROPLANO MODIFICADA (CON ASOCIACIONES ADICIONALES) ============
class Aeroplano {
    helice;
    trenAterrizaje;
    alas;
    cubierta;
    piloto; // Nueva asociación
    constructor(phelice, pTrenAterrizaje, pAlas, pCubierta) {
        this.helice = phelice;
        this.trenAterrizaje = pTrenAterrizaje;
        this.alas = pAlas;
        this.cubierta = pCubierta;
    }
    // Nuevo método para asignar piloto
    asignarPiloto(piloto) {
        this.piloto = piloto;
        piloto.asignarAeroplano(this);
    }
    ToString() {
        let mensaje = "Aeroplano compuesto por: ";
        mensaje += this.helice.ToString();
        mensaje += this.alas.ToString();
        mensaje += this.trenAterrizaje.ToString();
        mensaje += this.cubierta.ToString();
        if (this.piloto) {
            mensaje += ` | Piloto: ${this.piloto['nombre']}`;
        }
        return mensaje;
    }
}
// ============ DEMOSTRACIÓN CON TODAS LAS RELACIONES ============
console.log("=== DEMOSTRACIÓN DE LAS 5 RELACIONES ===\n");
// Crear componentes (como en tu código original)
let helice = new Helice(3);
let trenAterrizaje = new TrendeAterrizaje(2, 3, true);
let alas = new Alas(2, 3);
let cubierta = new Cubierta(true, true, true, 4, 4);
// 1. AGREGACIÓN - Aeroplano contiene componentes
let aeroplano = new Aeroplano(helice, trenAterrizaje, alas, cubierta);
console.log("✓ AGREGACIÓN: " + aeroplano.ToString());
// 2. ASOCIACIÓN - Piloto con Aeroplano
let piloto = new Piloto("Capitán Pérez");
aeroplano.asignarPiloto(piloto);
console.log("✓ ASOCIACIÓN: " + piloto.volar());
// 3. DEPENDENCIA - Servicio usa Helice temporalmente
let servicio = new ServicioMantenimiento();
console.log("✓ DEPENDENCIA: " + servicio.revisarHelice(helice));
// 4. AGREGACIÓN (colección) - Hangar contiene aeroplanos
let hangar = new Hangar("Principal");
hangar.agregarAeroplano(aeroplano);
hangar.listarAeroplanos();
// 5. HERENCIA - AeroplanoDeCarga es un VehiculoAereo
let avionCarga = new AeroplanoDeCarga("Boeing 747F", 80);
console.log("✓ HERENCIA: " + avionCarga.despegar());
console.log("\n=== RESUMEN DE RELACIONES ===");
console.log("1. AGREGACIÓN: Aeroplano → Helice, Alas, etc.");
console.log("2. ASOCIACIÓN: Piloto ↔ Aeroplano");
console.log("3. DEPENDENCIA: ServicioMantenimiento → Helice");
console.log("4. HERENCIA: AeroplanoDeCarga → VehiculoAereo");
console.log("5. COMPOSICIÓN: (Se puede añadir creando objetos dentro del constructor)");
