import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppErrors";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import auth from '@config/auth';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  refresh_token: string;
  token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }
  async execute(token: string): Promise<ITokenResponse> {
    try {
      const { email, sub } = verify(token, auth.jwt.secret_refresh_token) as IPayload;

      const user_id = sub;

      const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

      if (!userToken) {
        throw new AppError('Refresh Token does not exists!');
      }

      await this.usersTokensRepository.deleteById(userToken.id);

      const refresh_token = sign({ email }, auth.jwt.secret_refresh_token, {
        subject: sub,
        expiresIn: auth.jwt.expires_in_refresh_token,
      });

      const expires_date = this.dateProvider.addDays(
        auth.jwt.expires_refresh_token_days
      );

      await this.usersTokensRepository.create({
        expires_date,
        refresh_token,
        user_id
      });

      const newToken = sign({}, auth.jwt.secret_token, {
        subject: user_id,
        expiresIn: auth.jwt.expiresIn,
      });

      return {
        refresh_token,
        token: newToken,
      }
    } catch (error) {
      throw new AppError('Invalid token!', 401);
    }
  }
}

export { RefreshTokenUseCase }
