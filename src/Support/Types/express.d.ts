import User from '../Models/User';

declare global {
  namespace Express {
    interface User extends User {}
  }
}