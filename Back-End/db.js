const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // URL de conexión local
const client = new MongoClient(uri); // Elimina las opciones obsoletas
let db;

async function connectDB() {
    if (!db) {
        try {
            await client.connect();
            db = client.db('Proyecto_SED'); // Especifica el nombre de tu base de datos aquí
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    }
    return db;
}

module.exports = { connectDB, getDB: () => db };
