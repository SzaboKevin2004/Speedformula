import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../tokenBlacklist.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token revoked' });
      }
    if (!token) {
        return res.status(401).json({ error: true, message: "Nincs érvényes token!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: true, message: "Érvénytelen token!" });
    }
};import { authMiddleware } from './Middlewares/authMiddleware.js';

