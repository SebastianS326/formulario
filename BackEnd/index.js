const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a MySQL directamente en el código
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Usualmente, la contraseña por defecto es vacía en XAMPP
    database: 'personas_db'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, password, role], (err, result) => {
        if (err) throw err;
        res.send('Usuario registrado');
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.log('Error en la consulta:', err);
            return res.status(500).send('Error en la base de datos');
        }
        if (results.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado');
        }

        const user = results[0];
        if (user.password !== password) {
            console.log('Contraseña incorrecta');
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret_key', {
            expiresIn: 36000 // 24 horas
        });

        res.json({ token });
    });
});

// Función para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('No token provided');

    jwt.verify(token.split(' ')[1], 'your_jwt_secret_key', (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}

app.post('/add', (req, res) => {
    const { nombre, apellido, email, telefono } = req.body;
    const sql = 'INSERT INTO personas (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, email, telefono], (err, result) => {
        if (err) throw err;
        res.send('Persona agregada');
    });
});

app.get('/person/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM personas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('Persona no encontrada');
        }
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
