import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export default {
    LoginPostController: async (req, res) => {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({
                error: true,
                message: "Felhasználónév/email és jelszó szükséges!",
            });
        }

        try {
            const user = await User.findOne({
                where: { [Op.or]: [{ username: identifier }, { email: identifier }] }
            });

            if (!user) {
                return res.status(404).json({ error: true, message: "Ilyen felhasználó nincs!" });
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ error: true, message: "Helytelen jelszó!" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            req.session.userId = user.id;

            res.status(200).json({
                success: true,
                token,
                username: user.username,
                pfp: user.pfp,
                message: "Sikeres bejelentkezés!",
            });
        } catch (error) {
            console.error("Sikeretelen bejelentkezés:", error);
            res.status(500).json({ error: true, message: "Hiba a bejelentkezés során" });
        }
    },
};
