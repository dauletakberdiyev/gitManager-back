import dotenv from 'dotenv';

dotenv.config(); 

import express from 'express';
import passport from 'passport';
import session from 'express-session';
import db from './src/Support/Config/database';
import apiRoutes from './src/Support/Routes/api';
import passportConfig from './src/Support/Config/passport';

passportConfig(passport);  // Passport config

const app = express();

// Middleware for session and passport
app.use(session({ secret: 'dauletdaulet', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', apiRoutes);

// Start the server and sync the database
db.sync().then(() => {
  app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
  });
});

export default app;