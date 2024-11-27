import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import User from '../Models/User.js';


export default {
    RegisztracioPostController: async (req, res) => {
        const { first_name, last_name, username, email, password, confirmPassword } = req.body;

        
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: true, message: "Minden mező kitöltése kötelező." });
        }

        if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            return res.status(400).json({
                error: true,
                message: "A jelszónak minimum 8 karakternek kell lennie és tartalmazni kell egy nagy betűt és számot ",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: true, message: "Jelszó nem egyezik!" });
        }

        try {
            
            const existingUser = await User.findOne({
                where: { [Op.or]: [{ username }, { email }] }
            });

            if (existingUser) {
                return res.status(409).json({
                    error: true,
                    message: "A felhasználónév vagy jelszó már használatban van!",
                });
            }

            
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await User.create({
                first_name,
                last_name,
                username,
                email,
                password: hashedPassword,
            });

            res.status(201).json({
                success: true,
                message: "Sikeres regisztráció!",
                user: { id: newUser.id, username: newUser.username, email: newUser.email },
            });
        } catch (error) {
            console.error("Regisztrációs hiba:", error);
            res.status(500).json({ error: true, message: "A regisztráció során hiba keletkezett" });
        }
    },
};
