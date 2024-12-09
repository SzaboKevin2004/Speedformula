import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import BejelentkezésRouter from './Routers/Bejelentkezés.Route.js';
import sequelize from './database.js';


dotenv.config({ path: './backend.env' });


const app = express();
const PORT = process.env.PORT || 6969;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET || 'davidee',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

sequelize.authenticate()
    .then(() => console.log("Csatlakoztatva az adatbázissal!!"))
    .catch(err => console.error("Hiba:", err));


app.use("/regist", BejelentkezésRouter);


app.listen(PORT, () => {
    console.log(`A szerver fut http://localhost:${PORT}/`);
});

