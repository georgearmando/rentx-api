import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppErrors';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

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
    const { sub: user_id } = verify(token, 'c3686ca82c5b4aad5312da8d237edd9f') as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

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
