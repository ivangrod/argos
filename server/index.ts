import express, { Request, Response } from "express";
import sequelize from './persistence/database';
import {getLast25Incidences, initIncidenceModel} from './persistence/incidence.model.js';

import cors from "cors";

const Incidence = initIncidenceModel(sequelize);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión con PostgreSQL establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

testConnection();

app.get('/api/incidences', async (req: Request, res: Response) => {
    try {
        const incidences = await getLast25Incidences();
        res.json(incidences);
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining incidences' });
    }
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});