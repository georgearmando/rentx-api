import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppErrors';
import { JWTAuthProvider } from '@shared/container/providers/AuthProvider/implementations/JWTAuthProvider';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const authProvider = new JWTAuthProvider();

    const { user_id } = authProvider.verifyRefreshToken(token);

    /**
     * Aqui estamos a adicionar a propriedade user ao request do express
     * Mas para que isto funcione é necessário sobrescrever as tipagens do express, adicionando no request esta propriedade
     * Este processo foi feito em @types/express/index.d.ts
     * Neste caso estamos a atribuir a propriedade id ao atributo user do request pertencente ao express
     * Para que esta mesma propriedade seja acessível em outros arquivos através do request
     */
    request.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
