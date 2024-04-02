import { config } from "dotenv";
config({ path: __dirname + '../../../../.env' });
import mongoose from 'mongoose';

// atlas
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
// mongo windows
const DB_PORT = process.env.MONGODB_URL || `mongodb://localhost:27017/clients`;

export async function Main() {
    try {
        // Conectar ao MongoDB
        mongoose.connect(DB_PORT);

        // Lidar com eventos de conexão e erro
        mongoose.connection.once('open', () => {
            console.log('Conectado ao MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Erro de conexão ao MongoDB: ${err}`);
        });

    } catch (err) {
        console.log(`error: ${err}`)
    };
};