// server.ts - Servidor con Express
import express, { Request, Response } from 'express';
import cors from 'cors';

// Tus clases existentes aquí...
// (Helice, TrendeAterrizaje, Cubierta, Alas, Aeroplano, etc.)

const app = express();
app.use(cors());
app.use(express.json());

// CRUD de Aeroplanos (en memoria)
let aeroplanos: Aeroplano[] = [];
let nextId = 1;

// CREATE
app.post('/api/aeroplanos', (req: Request, res: Response) => {
    const { modelo, numHelices, numNeumaticos, numAmortiguadores, fijoRetractil, alasFrente, alasCola, cabinaTripulacion, cabinaVuelo, sistemaEmergencia, tanquesCombustible, puertasSalida } = req.body;
    
    const helice = new Helice(numHelices);
    const tren = new TrendeAterrizaje(numNeumaticos, numAmortiguadores, fijoRetractil);
    const alas = new Alas(alasFrente, alasCola);
    const cubierta = new Cubierta(cabinaTripulacion, cabinaVuelo, sistemaEmergencia, tanquesCombustible, puertasSalida);
    
    const aeroplano = new Aeroplano(nextId++, modelo, helice, tren, alas, cubierta);
    aeroplanos.push(aeroplano);
    
    res.status(201).json(aeroplano);
});

// READ - Todos los aeroplanos
app.get('/api/aeroplanos', (req: Request, res: Response) => {
    res.json(aeroplanos.map(a => a.ToJSON()));
});

// READ - Un aeroplano por ID
app.get('/api/aeroplanos/:id', (req: Request, res: Response) => {
    const aeroplano = aeroplanos.find(a => a.getId() === parseInt(req.params.id));
    if (!aeroplano) return res.status(404).json({ error: 'No encontrado' });
    res.json(aeroplano.ToJSON());
});

// UPDATE
app.put('/api/aeroplanos/:id', (req: Request, res: Response) => {
    const index = aeroplanos.findIndex(a => a.getId() === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'No encontrado' });
    
    // Actualizar lógica
    aeroplanos[index].setModelo(req.body.modelo);
    res.json(aeroplanos[index]);
});

// DELETE
app.delete('/api/aeroplanos/:id', (req: Request, res: Response) => {
    const index = aeroplanos.findIndex(a => a.getId() === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'No encontrado' });
    
    aeroplanos.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));