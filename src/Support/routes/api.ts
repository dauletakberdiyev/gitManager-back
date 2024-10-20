import { Router, Request, Response } from 'express';
import passport from 'passport';
import User from '../Models/User';

const router = Router();

// GitHub OAuth login route
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get(
    '/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req: Request, res: Response) => {
      // On success, redirect to dashboard
      res.redirect('/dashboard');
    }
);

// Logout route
router.get('/logout', (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect('/');
    });
});

router.get('/dashboard', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/github');
    }
    const user = req.user as User

    res.send(`Hello, ${user.name}`);
});

export default router;