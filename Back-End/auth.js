// auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('./db');
const { ObjectId } = require('mongodb');

const jwtSecret = process.env.JWT_SECRET || 'default_secret'; // Cambia 'default_secret' por una clave segura y almacénala en .env

// Función para registrar un usuario
const registerUser = async (nombre_usuario, nombre, email, telefono, fecha_nacimiento, password,  rol_id, callback) => {
    try {
        if (!nombre_usuario ||!nombre|| !email ||!telefono||!fecha_nacimiento|| !password || !rol_id) {
            throw new Error('Faltan datos para el registro');
        }
        
        const hashedPassword = await bcrypt.hash(password, 12); // Incrementar el salt rounds a 12 para más seguridad
        const user = { nombre_usuario, nombre, email, telefono, fecha_nacimiento, password: hashedPassword, rol_id };

        const result = await getDB().collection('users').insertOne(user);
        callback(null, { id: result.insertedId });
    } catch (err) {
        callback({ error: err.message });   
    }
};
const updateUser = async (id,nombre_usuario, nombre, email, telefono, fecha_nacimiento, rol_id, password, callback) => {
    try {
        const db = getDB();
        const query = {
            $set: {
                nombre_usuario,
                nombre,
                email,
                telefono,
                fecha_nacimiento,
                rol_id,
                password
            }
        };
        const hashedPassword = await bcrypt.hash(password, 12); // Incrementar el salt rounds a 12 para más seguridad
        const user = { nombre_usuario, nombre, email, telefono, fecha_nacimiento, password: hashedPassword, rol_id };


        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            query
        );
        callback(null, result);
    } catch (err) {
        callback(err);
    }
};

const deleteUser = (id, callback) => {
    try {
        const db = getDB();
        db.collection('users').deleteOne({ _id: new ObjectId(id) })
            .then(result => callback(null, result))
            .catch(err => callback(err));
    } catch (error) {
        callback(error);
    }
};
const getAllUsers = (callback) => {
    const db = getDB();
    db.collection('users').find({}).toArray()
        .then(users => callback(null, users))
        .catch(err => callback(err));
};
// Función para iniciar sesión
const loginUser = async (email, password, callback) => {
    try {
        if (!email || !password) throw new Error('Faltan datos para el inicio de sesión');

        const user = await getDB().collection('users').findOne({ email });
        if (!user) return callback(null, null);

        const match = await bcrypt.compare(password, user.password);
        if (!match) return callback(null, null);

        const token = jwt.sign({ userId: user._id, rol_id: user.rol_id }, jwtSecret, { expiresIn: '1h' });
        callback(null, { token });
    } catch (err) {
        callback({ error: err.message });
    }
};

// Middleware para autenticar el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Middleware para autorizar roles
const authorizeRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol_id)) {
        return res.status(403).json({ error: 'No autorizado' });
    }
    next();
};

module.exports = { registerUser, loginUser, authenticateToken, authorizeRole,updateUser,deleteUser,getAllUsers };
