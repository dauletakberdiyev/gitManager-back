import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

class AuthController {
    // GitHub OAuth login (calls passport.authenticate)
    githubLogin(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    }

    githubCallback(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('github', { failureRedirect: '/login' }, (err: Error | null, user: any) => {
            if (err) return next(err);
            
            req.logIn(user, (err: Error | null) => {
              if (err) return next(err);
              return res.redirect('/api/dashboard'); // Redirect to the dashboard after login
            });
        })(req, res, next);
    }
}

export default new AuthController();