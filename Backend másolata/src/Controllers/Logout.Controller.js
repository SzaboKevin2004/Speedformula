import { tokenBlacklist } from "../tokenBlacklist.js";

export default {
    LogoutPostController: (req, res) => {
        
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        tokenBlacklist.add(token);
        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Nem található aktív token!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Sikeres kijelentkezés!",
        });
    },
};