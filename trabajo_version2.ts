// ============ MANTENGO TUS CLASES ORIGINALES ============
class Turbina {
    private numTurbinas: number = 0;
    public constructor(n: number) {
        this.numTurbinas = n;
    }
    public ToString() {
        return this.numTurbinas + " Turbina/s";
    }
}

class Helice {
    private numHelices: number = 0;
    public constructor(n: number) {
        this.numHelices = n;
    }
    public ToString() {
        return this.numHelices + " hélice/s";
    }
}

class TrendeAterrizaje {
    private numNeumaticos: number = 0;
    private numAmortiguadores: number = 0;
    private fijoRetractil: boolean = false;
    public constructor(a: number, b: number, c: boolean) {
        this.numNeumaticos = a;
        this.numAmortiguadores = b;
        this.fijoRetractil = c;
    }
    public ToString() {
        let mensaje: string = "Tren de Aterrizaje compuesto por: ";
        if (this.fijoRetractil) {
            mensaje += " con Retractil fijo, ";
        }
        mensaje += this.numNeumaticos + " neumáticos, " + this.numAmortiguadores + " amoriguadores ";
        return mensaje;
    }
}

class Cubierta {
    private cabinaTripulacion: boolean = false;
    private cabinaVuelo: boolean = false;
    private sistemaEmergencia: boolean = false;
    private numTanquesCombustible: number = 0;
    private numPuertasSalidas: number = 0;
    public constructor(pCabinaTripulacion: boolean, pCabinaVuelo: boolean, pSistemaEmergencia: boolean, pTanquesCombustible: number, pPuertasSalida: number) {
        this.cabinaTripulacion = pCabinaTripulacion;
        this.cabinaVuelo = pCabinaVuelo;
        this.sistemaEmergencia = pSistemaEmergencia;
        this.numTanquesCombustible = pTanquesCombustible;
        this.numPuertasSalidas = pPuertasSalida;
    }
    public ToString() {
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
    private numAlasFrente: number = 0;
    private numAlasCola: number = 0;
    public constructor(mAlasFrente: number, nAlasCola: number) {
        this.numAlasFrente = mAlasFrente;
        this.numAlasCola = nAlasCola;
    }
    public ToString() {
        return "Alas Frontales: " + this.numAlasFrente + " Alas Posteriore: " + this.numAlasCola;
    }
}

// ============ NUEVAS CLASES QUE AÑADEN LAS RELACIONES FALTANTES ============

// 1. HERENCIA - Clase base para demostración
abstract class VehiculoAereo {
    protected modelo: string;
    
    constructor(modelo: string) {
        this.modelo = modelo;
    }
    
    abstract despegar(): string;
}

// 2. HERENCIA - AeroplanoDeCarga ES UN VehiculoAereo
class AeroplanoDeCarga extends VehiculoAereo {
    private capacidadCarga: number;
    
    constructor(modelo: string, capacidad: number) {
        super(modelo);
        this.capacidadCarga = capacidad;
    }
    
    despegar(): string {
        return `${this.modelo} (carga: ${this.capacidadCarga}tn) despegando`;
    }
}

// 3. ASOCIACIÓN - Piloto con Aeroplano
class Piloto {
    private nombre: string;
    private aeroplanoAsignado?: Aeroplano;
    
    constructor(nombre: string) {
        this.nombre = nombre;
    }
    
    asignarAeroplano(aeroplano: Aeroplano): void {
        this.aeroplanoAsignado = aeroplano;
        console.log(`${this.nombre} asignado al aeroplano`);
    }
    
    volar(): string {
        if (this.aeroplanoAsignado) {
            return `${this.nombre} vuela: ${this.aeroplanoAsignado.ToString()}`;
        }
        return `${this.nombre} sin aeroplano`;
    }
}

// 4. DEPENDENCIA - Servicio de mantenimiento
class ServicioMantenimiento {
    revisarHelice(helice: Helice): string {
        return `Revisando ${helice.ToString()}`;
    }
}

// 5. AGREGACIÓN - Hangar que contiene aeroplanos
class Hangar {
    private nombre: string;
    private aeroplanos: Aeroplano[] = [];
    
    constructor(nombre: string) {
        this.nombre = nombre;
    }
    
    agregarAeroplano(aeroplano: Aeroplano): void {
        this.aeroplanos.push(aeroplano);
        console.log(`Aeroplano agregado al hangar ${this.nombre}`);
    }
    
    listarAeroplanos(): void {
        console.log(`Hangar ${this.nombre} tiene ${this.aeroplanos.length} aeroplanos`);
    }
}

// ============ CLASE AEROPLANO MODIFICADA (CON ASOCIACIONES ADICIONALES) ============
class Aeroplano {
    private helice: Helice;
    private trenAterrizaje: TrendeAterrizaje;
    private alas: Alas;
    private cubierta: Cubierta;
    private piloto?: Piloto; // Nueva asociación
    
    constructor(phelice: Helice, pTrenAterrizaje: TrendeAterrizaje, pAlas: Alas, pCubierta: Cubierta) {
        this.helice = phelice;
        this.trenAterrizaje = pTrenAterrizaje;
        this.alas = pAlas;
        this.cubierta = pCubierta;
    }
    
    // Nuevo método para asignar piloto
    asignarPiloto(piloto: Piloto): void {
        this.piloto = piloto;
        piloto.asignarAeroplano(this);
    }
    
    public ToString() {
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
// ============ COMPOSICIÓN (relación fuerte) ============
class AlaInterna {
    private tipo: string;
    
    constructor(tipo: string) {
        this.tipo = tipo;
    }
    
    public getInfo(): string {
        return `Ala ${this.tipo}`;
    }
}

class AlaCompuesta {
    private alas: AlaInterna[] = []; // COMPOSICIÓN - las alas internas NO existen sin AlaCompuesta
    
    constructor(numAlas: number) {
        // COMPOSICIÓN: Los objetos se crean DENTRO del constructor
        for (let i = 1; i <= numAlas; i++) {
            this.alas.push(new AlaInterna(`Secundaria ${i}`));
        }
        console.log(`✓ COMPOSICIÓN: AlaCompuesta creada con ${numAlas} alas internas`);
    }
    
    public getInfo(): string {
        return `AlaCompuesta (${this.alas.length} alas internas)`;
    }
}

// Modificar la clase Alas para usar composición (opcional)
class AlasConComposicion {
    private numAlasFrente: number = 0;
    private numAlasCola: number = 0;
    private estructuraInterna: AlaCompuesta; // COMPOSICIÓN
    
    public constructor(mAlasFrente: number, nAlasCola: number) {
        this.numAlasFrente = mAlasFrente;
        this.numAlasCola = nAlasCola;
        // COMPOSICIÓN: se crea dentro del constructor
        this.estructuraInterna = new AlaCompuesta(mAlasFrente + nAlasCola);
    }
    
    public ToString(): string {
        return `Alas Frontales: ${this.numAlasFrente}, Posteriores: ${this.numAlasCola} | ${this.estructuraInterna.getInfo()}`;
    }
}
// ============ DEMOSTRACIÓN DE COMPOSICIÓN ============
console.log("\n--- DEMOSTRACIÓN DE COMPOSICIÓN ---");
let alasCompuestas = new AlasConComposicion(2, 3);
console.log("COMPOSICIÓN: " + alasCompuestas.ToString());
// NOTA: Las alas internas NO pueden existir sin AlaCompuesta

console.log("\n=== RESUMEN DE RELACIONES ===");
console.log("1. AGREGACIÓN: Aeroplano → Helice, Alas, etc.");
console.log("2. ASOCIACIÓN: Piloto ↔ Aeroplano");
console.log("3. DEPENDENCIA: ServicioMantenimiento → Helice");
console.log("4. HERENCIA: AeroplanoDeCarga → VehiculoAereo");
console.log("5. COMPOSICIÓN: AlaConComposicion → AlaCompuesta → AlaInterna ✓ IMPLEMENTADA");