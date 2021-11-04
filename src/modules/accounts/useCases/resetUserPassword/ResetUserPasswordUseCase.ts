
/**
 * - Receber o token e a nova password
 * - Validar o token
 * - Verificar se o token está expirado ou não
 * - Recuperar os dados do user e actualizar a password
 * - Remover o token da BD
 */

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe"

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ token, password }: IRequest): Promise<void> {
    // Valida o token
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Invalid Token');
    }

    // Verifica se o token está expirado ou não
    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    // Recupera os dados do user e actualiza a password
    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    // Remove o token da BD
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase }
