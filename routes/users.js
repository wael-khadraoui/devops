import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../models/db.js';

const router = express.Router();

/* ============================
   REGISTER
============================ */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("📩 /register reçu :", username, password);

        if (!username || !password) {
            return res.status(400).json({ message: "Champs manquants" });
        }

        // Vérifier si l'utilisateur existe déjà
        const [existing] = await db.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: "Nom d'utilisateur déjà pris" });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion
        await db.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        res.status(201).json({ message: "Utilisateur créé avec succès" });

    } catch (error) {
        console.error("🔥 ERREUR REGISTER :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

/* ============================
   LOGIN
============================ */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Champs manquants" });
        }

        const [users] = await db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error("🔥 ERREUR LOGIN :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

/* ============================
   LIST USERS
============================ */
router.get('/list', async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, username FROM users'
        );

        res.json(users);

    } catch (error) {
        console.error("🔥 ERREUR LIST :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

/* ============================
   DELETE USER
============================ */
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json({ message: "Utilisateur supprimé avec succès" });

    } catch (error) {
        console.error("🔥 ERREUR DELETE :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

export default router;
