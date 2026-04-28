import express from 'express';
import cors from 'cors';
import path from 'path';

class Helice {
    private numHelices: number = 0;
    public constructor(n: number) { this.numHelices = n; }
    public ToString() { return this.numHelices + " helice/s"; }
    public toJSON() { return { numHelices: this.numHelices }; }
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
    public ToString() { return `Tren: ${this.numNeumaticos} neumaticos`; }
    public toJSON() {
        return {
            numNeumaticos: this.numNeumaticos,
            numAmortiguadores: this.numAmortiguadores,
            fijoRetractil: this.fijoRetractil
        };
    }
}

class Cubierta {
    private cabinaTripulacion: boolean;
    private cabinaVuelo: boolean;
    private sistemaEmergencia: boolean;
    private numTanquesCombustible: number;
    private numPuertasSalidas: number;
    public constructor(a: boolean, b: boolean, c: boolean, d: number, e: number) {
        this.cabinaTripulacion = a;
        this.cabinaVuelo = b;
        this.sistemaEmergencia = c;
        this.numTanquesCombustible = d;
        this.numPuertasSalidas = e;
    }
    public ToString() { return `Cubierta: ${this.numTanquesCombustible} tanques`; }
    public toJSON() {
        return {
            cabinaTripulacion: this.cabinaTripulacion,
            cabinaVuelo: this.cabinaVuelo,
            sistemaEmergencia: this.sistemaEmergencia,
            numTanquesCombustible: this.numTanquesCombustible,
            numPuertasSalidas: this.numPuertasSalidas
        };
    }
}

class Alas {
    private numAlasFrente: number;
    private numAlasCola: number;
    public constructor(frente: number, cola: number) {
        this.numAlasFrente = frente;
        this.numAlasCola = cola;
    }
    public ToString() { return `Alas F:${this.numAlasFrente} C:${this.numAlasCola}`; }
    public toJSON() { return { numAlasFrente: this.numAlasFrente, numAlasCola: this.numAlasCola }; }
}

class Aeroplano {
    private id: number;
    private modelo: string;
    private helice: Helice;
    private trenAterrizaje: TrendeAterrizaje;
    private alas: Alas;
    private cubierta: Cubierta;

    constructor(id: number, modelo: string, helice: Helice, tren: TrendeAterrizaje, alas: Alas, cubierta: Cubierta) {
        this.id = id;
        this.modelo = modelo;
        this.helice = helice;
        this.trenAterrizaje = tren;
        this.alas = alas;
        this.cubierta = cubierta;
    }

    public getId() { return this.id; }
    public getModelo() { return this.modelo; }
    public setModelo(modelo: string) { this.modelo = modelo; }
    public ToString() { return `${this.modelo} (ID:${this.id})`; }

    public toJSON() {
        return {
            id: this.id,
            modelo: this.modelo,
            helice: this.helice.toJSON(),
            trenAterrizaje: this.trenAterrizaje.toJSON(),
            alas: this.alas.toJSON(),
            cubierta: this.cubierta.toJSON()
        };
    }
}

let aeroplanos: Aeroplano[] = [];
let nextId = 1;

function crearAeroplano(
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
    tanques: number,
    puertas: number
): Aeroplano {
    const helice = new Helice(numHelices);
    const tren = new TrendeAterrizaje(numNeumaticos, numAmortiguadores, fijoRetractil);
    const alas = new Alas(alasFrente, alasCola);
    const cubierta = new Cubierta(cabinaTripulacion, cabinaVuelo, sistemaEmergencia, tanques, puertas);
    const avion = new Aeroplano(nextId++, modelo, helice, tren, alas, cubierta);
    aeroplanos.push(avion);
    return avion;
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/aeroplanos', (req, res) => {
    res.json(aeroplanos.map(a => a.toJSON()));
});

app.get('/api/aeroplanos/:id', (req, res) => {
    const avion = aeroplanos.find(a => a.getId() === parseInt(req.params.id));
    if (!avion) return res.status(404).json({ error: 'No encontrado' });
    res.json(avion.toJSON());
});

app.post('/api/aeroplanos', (req, res) => {
    const {
        modelo, numHelices, numNeumaticos, numAmortiguadores, fijoRetractil,
        alasFrente, alasCola, cabinaTripulacion, cabinaVuelo, sistemaEmergencia,
        tanquesCombustible, puertasSalida
    } = req.body;

    const nuevo = crearAeroplano(
        modelo, numHelices, numNeumaticos, numAmortiguadores, fijoRetractil,
        alasFrente, alasCola, cabinaTripulacion, cabinaVuelo, sistemaEmergencia,
        tanquesCombustible, puertasSalida
    );
    res.status(201).json(nuevo.toJSON());
});

app.put('/api/aeroplanos/:id', (req, res) => {
    const avion = aeroplanos.find(a => a.getId() === parseInt(req.params.id));
    if (!avion) return res.status(404).json({ error: 'No encontrado' });
    if (req.body.modelo) avion.setModelo(req.body.modelo);
    res.json(avion.toJSON());
});

app.delete('/api/aeroplanos/:id', (req, res) => {
    const index = aeroplanos.findIndex(a => a.getId() === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'No encontrado' });
    aeroplanos.splice(index, 1);
    res.status(204).send();
});

crearAeroplano("Boeing 737", 2, 6, 4, true, 2, 2, true, true, true, 4, 4);
crearAeroplano("Airbus A320", 2, 6, 4, true, 2, 2, true, true, true, 6, 4);
crearAeroplano("Cessna 172", 1, 3, 2, false, 2, 1, true, false, false, 2, 2);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`API CRUD disponible en http://localhost:${PORT}/api/aeroplanos`);
});
