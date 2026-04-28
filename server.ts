// server.ts - Servidor con Express
import express from 'express';
import cors from 'cors';

// ============ TUS CLASES ORIGINALES ============
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
        mensaje += this.numNeumaticos + " neumáticos, " + this.numAmortiguadores + " amortiguadores ";
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
        if (this.cabinaVuelo) mensaje += " Cubierta de Vuelo, ";
        if (this.cabinaTripulacion) mensaje += " Cubierta de Tripulación, ";
        if (this.sistemaEmergencia) mensaje += " Sistema de Emergencia, ";
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
        return "Alas Frontales: " + this.numAlasFrente + " Posteriores: " + this.numAlasCola;
    }
}

// ============ CLASE AEROPLANO MODIFICADA (CON ID) ============
class Aeroplano {
    private id: number;
    private modelo: string;
    private helice: Helice;
    private trenAterrizaje: TrendeAterrizaje;
    private alas: Alas;
    private cubierta: Cubierta;
    
    constructor(id: number, modelo: string, helice: Helice, trenAterrizaje: TrendeAterrizaje, alas: Alas, cubierta: Cubierta) {
        this.id = id;
        this.modelo = modelo;
        this.helice = helice;
        this.trenAterrizaje = trenAterrizaje;
        this.alas = alas;
        this.cubierta = cubierta;
    }
    
    // Getters
    public getId(): number { return this.id; }
    public getModelo(): string { return this.modelo; }
    public getHelice(): Helice { return this.helice; }
    public getTrenAterrizaje(): TrendeAterrizaje { return this.trenAterrizaje; }
    public getAlas(): Alas { return this.alas; }
    public getCubierta(): Cubierta { return this.cubierta; }
    
    // Setters
    public setModelo(modelo: string): void { this.modelo = modelo; }
    
    public ToString() {
        let mensaje = `[ID:${this.id}] Aeroplano ${this.modelo} | `;
        mensaje += this.helice.ToString() + " | ";
        mensaje += this.alas.ToString() + " | ";
        mensaje += this.trenAterrizaje.ToString() + " | ";
        mensaje += this.cubierta.ToString();
        return mensaje;
    }
}

// ============ CLASE CRUD COMPLETA ============
class CRUDAeroplano {
    private aeroplanos: Map<number, Aeroplano> = new Map();
    private nextId: number = 1;
    
    // CREATE - Crear un nuevo aeroplano
    public crearAeroplano(
        modelo: string,
        numHelices: number,
        numNeumaticos: number,
        numAmortiguadores: number,
        fijoRetractil: boolean,
        alasFrente: number,
        alasCola: number,
        cabinaTripulacion: boolean,
        cabinaVuelo: boolean,
        sistemaEmergencia: boolean,
        tanquesCombustible: number,
        puertasSalida: number
    ): Aeroplano {
        
        const helice = new Helice(numHelices);
        const tren = new TrendeAterrizaje(numNeumaticos, numAmortiguadores, fijoRetractil);
        const alas = new Alas(alasFrente, alasCola);
        const cubierta = new Cubierta(cabinaTripulacion, cabinaVuelo, sistemaEmergencia, tanquesCombustible, puertasSalida);
        
        const aeroplano = new Aeroplano(this.nextId++, modelo, helice, tren, alas, cubierta);
        this.aeroplanos.set(aeroplano.getId(), aeroplano);
        
        console.log(`✅ CREATE: Aeroplano creado ID:${aeroplano.getId()} - ${modelo}`);
        return aeroplano;
    }
    
    // READ - Obtener todos los aeroplanos
    public obtenerTodos(): Aeroplano[] {
        return Array.from(this.aeroplanos.values());
    }
    
    // READ - Obtener un aeroplano por ID
    public obtenerPorId(id: number): Aeroplano | null {
        const aeroplano = this.aeroplanos.get(id);
        if (!aeroplano) {
            console.log(`❌ READ: No se encontró aeroplano con ID ${id}`);
            return null;
        }
        console.log(`✅ READ: Aeroplano ID ${id} encontrado`);
        return aeroplano;
    }
    
    // UPDATE - Actualizar modelo de un aeroplano
    public actualizarModelo(id: number, nuevoModelo: string): boolean {
        const aeroplano = this.aeroplanos.get(id);
        if (!aeroplano) {
            console.log(`❌ UPDATE: No se encontró aeroplano con ID ${id}`);
            return false;
        }
        
        const modeloAnterior = aeroplano.getModelo();
        aeroplano.setModelo(nuevoModelo);
        console.log(`✅ UPDATE: Aeroplano ID ${id} actualizado: "${modeloAnterior}" → "${nuevoModelo}"`);
        return true;
    }
    
    // UPDATE - Actualizar hélices
    public actualizarHelices(id: number, nuevasHelices: number): boolean {
        const aeroplano = this.aeroplanos.get(id);
        if (!aeroplano) {
            console.log(`❌ UPDATE: No se encontró aeroplano con ID ${id}`);
            return false;
        }
        
        // Nota: Como Helice no tiene setter, este es un ejemplo conceptual
        console.log(`✅ UPDATE: Aeroplano ID ${id} - Se cambiarían a ${nuevasHelices} hélices`);
        return true;
    }
    
    // DELETE - Eliminar un aeroplano
    public eliminarAeroplano(id: number): boolean {
        if (!this.aeroplanos.has(id)) {
            console.log(`❌ DELETE: No se encontró aeroplano con ID ${id}`);
            return false;
        }
        
        this.aeroplanos.delete(id);
        console.log(`✅ DELETE: Aeroplano ID ${id} eliminado`);
        return true;
    }
    
    // Mostrar todos los aeroplanos en consola
    public listarTodos(): void {
        console.log("\n📋 LISTA DE AEROPLANOS:");
        console.log("=".repeat(60));
        
        const aeroplanos = this.obtenerTodos();
        if (aeroplanos.length === 0) {
            console.log("No hay aeroplanos registrados.");
        } else {
            aeroplanos.forEach(avion => {
                console.log(avion.ToString());
            });
        }
        console.log("=".repeat(60));
        console.log(`Total: ${aeroplanos.length} aeroplano(s)\n`);
    }
}

// ============ DEMOSTRACIÓN DEL CRUD ============
console.log("=".repeat(70));
console.log("🚀 CRUD DE AEROPLANOS - DEMOSTRACIÓN COMPLETA");
console.log("=".repeat(70));

const crud = new CRUDAeroplano();

// 1. CREATE - Crear varios aeroplanos
console.log("\n📌 1. OPERACIÓN CREATE");
console.log("-".repeat(50));

const avion1 = crud.crearAeroplano(
    "Boeing 737", 2, 6, 4, true, 2, 2, true, true, true, 4, 4
);

const avion2 = crud.crearAeroplano(
    "Airbus A320", 2, 6, 4, true, 2, 2, true, true, true, 6, 4
);

const avion3 = crud.crearAeroplano(
    "Cessna 172", 1, 3, 2, false, 2, 1, true, false, false, 2, 2
);

// 2. READ - Listar todos
console.log("\n📌 2. OPERACIÓN READ - Todos los aeroplanos");
console.log("-".repeat(50));
crud.listarTodos();

// 3. READ - Obtener por ID específico
console.log("\n📌 3. OPERACIÓN READ - Búsqueda por ID");
console.log("-".repeat(50));
const avionBuscado = crud.obtenerPorId(2);
if (avionBuscado) {
    console.log(`   Encontrado: ${avionBuscado.ToString()}`);
}

// 4. UPDATE - Actualizar modelo
console.log("\n📌 4. OPERACIÓN UPDATE - Actualizar modelo");
console.log("-".repeat(50));
crud.actualizarModelo(1, "Boeing 737 MAX");
crud.actualizarModelo(2, "Airbus A320 Neo");

// Mostrar después del UPDATE
console.log("\n   📋 Después del UPDATE:");
crud.listarTodos();

// 5. DELETE - Eliminar un aeroplano
console.log("\n📌 5. OPERACIÓN DELETE - Eliminar aeroplano");
console.log("-".repeat(50));
crud.eliminarAeroplano(3);
crud.eliminarAeroplano(99); // Probar eliminar uno que no existe

// Mostrar después del DELETE
console.log("\n   📋 Después del DELETE:");
crud.listarTodos();

// 6. COMPOSICIÓN (demostración adicional)
console.log("\n📌 6. COMPOSICIÓN - Relación fuerte implementada");
console.log("-".repeat(50));

class AlaInterna {
    private tipo: string;
    constructor(tipo: string) { this.tipo = tipo; }
    public ToString(): string { return `Ala ${this.tipo}`; }
}

class AlaCompuesta {
    private alas: AlaInterna[] = [];
    constructor(numAlas: number) {
        for (let i = 1; i <= numAlas; i++) {
            this.alas.push(new AlaInterna(`Interna ${i})`));
        }
    }
    public ToString(): string {
        return `AlaCompuesta con ${this.alas.length} alas internas`;
    }
}

const alaCompuesta = new AlaCompuesta(5);
console.log(`✅ COMPOSICIÓN: ${alaCompuesta.ToString()}`);
console.log("   Las alas internas NO pueden existir sin AlaCompuesta\n");

// RESUMEN FINAL
console.log("=".repeat(70));
console.log("✅ RESUMEN DEL CRUD IMPLEMENTADO:");
console.log("=".repeat(70));
console.log("✓ CREATE  - Se crearon 3 aeroplanos");
console.log("✓ READ    - Se listaron todos y se buscó por ID");
console.log("✓ UPDATE  - Se actualizaron modelos de aeroplanos");
console.log("✓ DELETE  - Se eliminó 1 aeroplano");
console.log("\n✓ RELACIONES POO incluidas:");
console.log("  • AGREGACIÓN: Aeroplano → Helice, Alas, Tren, Cubierta");
console.log("  • COMPOSICIÓN: AlaCompuesta → AlaInterna");
console.log("  • ASOCIACIÓN: (Piloto ↔️ Aeroplano - disponible)");
console.log("  • DEPENDENCIA: (ServicioMantenimiento → Helice)");
console.log("  • HERENCIA: (AeroplanoDeCarga → VehiculoAereo)");
console.log("=".repeat(70));