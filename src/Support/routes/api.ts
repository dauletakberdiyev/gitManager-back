import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import User from '../Models/User';
import isAuthenticated from '../Middlewares/AuthMiddleware';

const router = Router();

// Prefix `/auth` for authentication-related routes
router.use('/auth', authRoutes);

router.get('/dashboard', isAuthenticated, (req: Request, res: Response) => {
    const user = req.user as User
    
    res.send(`Hello, ${user.name}`);
});

export default router;