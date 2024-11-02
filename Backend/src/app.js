import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config({ path: './src/backend.env' });

console.log('JWT_SECRET:', process.env.JWT_SECRET);



const PORT=6969;
const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'davidee', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const db=mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    user: 'David',
    password:'davidee',
    database:'myform'
});

db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/register', (req, res) => {
    const { firstname, lastname, username, email, password, confirmPassword } = req.body;

    if (!username && !email || !password || !confirmPassword) {
        return res.sendStatus(400);
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.sendStatus(400);
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.'); 
    }

    const checkSql = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkSql, [username, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('There was a problem checking the username or email.');
        }
        if (results.length > 0) {
            return res.status(409).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Conflict</title>
                </head>
                <body>
                    <h1>A felhasználónév vagy email már foglalt</h1>
                    <a href="/register.html">Go back to registration</a>
                    <a href="/login.html">Or already Logined??</a>
                </body>
                </html>
            `);
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const sql = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [firstname, lastname, username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('There was a problem registering the user.');
            }
            // Redirect after successful registration
            res.redirect('/index.html'); // Redirect to index.html
        });
    });
});





app.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    
    if (!identifier || !password) {
        return res.status(400).send('Username and password are required.');
    }

    console.log('Received login attempt for:', identifier);

    const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(sql, [identifier, identifier], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error on the server.');
        }

        if (result.length === 0) {
            return res.status(404).send('No user found.');
        }

        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).send('Server error: JWT_SECRET is not set.');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });

        req.session.userId = user.id;
        res.status(200).redirect('/index2.html');
        //.send({
        //    auth: true,
        //    token,
        //    message: 'Successfully logged in!',
        //})
    });
});

app.post('/logout', (req, res) => {
    if (!req.session) {
        return res.status(400).send('No session to destroy.');
    }
    
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('There was a problem logging out.');
        }
        res.redirect('/index.html');
    });
});





app.listen(PORT,()=>{
    console.log(`A backend szerver elindult! URL: http://localhost:${PORT}/`);
});