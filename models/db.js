import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST,       // 127.0.0.1
    user: process.env.DB_USER,       // root
    password: process.env.DB_PASSWORD, // vide si aucun mot de passe
    database: process.env.DB_NAME,   // task_manager
    port: 3306                       // port MySQL par défaut
});
