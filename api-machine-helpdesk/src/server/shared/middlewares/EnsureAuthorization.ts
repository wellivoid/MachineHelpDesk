import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuthorization = (allowedLevels: string[]): RequestHandler => {
  return (req, res, next) => {
    const userLevel = req.headers.levelUser as string;

    if (allowedLevels.includes('all')) {
      return next();
    }

    if (!userLevel) {
      res.status(StatusCodes.FORBIDDEN).json({
        errors: { default: 'Nível de usuário não encontrado' }
      });
      return; 
    }

    if (!allowedLevels.includes(userLevel)) {
      res.status(StatusCodes.FORBIDDEN).json({
        errors: { default: 'Acesso negado' }
      });
      return; 
    }

    next(); 
  };
};
