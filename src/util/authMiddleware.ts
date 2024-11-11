
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Validar el token usando la clave secreta de las variables de entorno
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    next();
  });
};

export default checkToken;
