import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware/route
  }
  // User is not authenticated, redirect to login page
  res.redirect('/api/auth/github');
};

export default isAuthenticated;
