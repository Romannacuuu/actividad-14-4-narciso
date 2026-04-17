"use strict";
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
class Aeroplano {
    helice;
    trenAterrizaje;
    alas;
    cubierta;
    constructor(phelice, pTrenAterrizaje, pAlas, pCubierta) {
        this.helice = phelice;
        this.trenAterrizaje = pTrenAterrizaje;
        this.alas = pAlas;
        this.cubierta = pCubierta;
    }
    ToString() {
        let mensaje = "Aeroplano compuesto por: ";
        mensaje += this.helice.ToString();
        mensaje += this.alas.ToString();
        mensaje += this.trenAterrizaje.ToString();
        mensaje += this.cubierta.ToString();
        return mensaje;
    }
}
let helice = new Helice(3);
let trenAterrizaje = new TrendeAterrizaje(2, 3, true);
let alas = new Alas(2, 3);
let cubierta = new Cubierta(true, true, true, 4, 4);
let aeroplano = new Aeroplano(helice, trenAterrizaje, alas, cubierta);
console.log(aeroplano.ToString());
