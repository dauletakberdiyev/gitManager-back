import { Router, Request, Response } from 'express';
import AuthController from '../../Domain/Auth/Github/Controllers/AuthController';

const router = Router();

// GitHub OAuth login route
router.get('/github', AuthController.githubLogin);

// GitHub OAuth callback route
router.get('/callback', AuthController.githubCallback);

// Logout route
router.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default router;
