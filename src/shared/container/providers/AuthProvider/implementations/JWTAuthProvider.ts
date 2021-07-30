import { injectable, inject } from "tsyringe";
import { sign, verify } from "jsonwebtoken";
import { IAuthProvider } from "../IAuthProvider";
import authConfig from '@config/auth';
import { IDateProvider } from "../../DateProvider/IDateProvider";

interface IPayload {
  sub: string;
}

@injectable()
class JWTAuthProvider implements IAuthProvider {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }
  generateToken(user_id: string): string {
    const { expiresIn, secret_token } = authConfig.jwt;

    const token = sign({}, secret_token, {
      subject: user_id,
      expiresIn
    });

    return token
  }

  generateRefreshToken(email: string, user_id: string): string {
    const { secret_refresh_token, expires_in_refresh_token } = authConfig.jwt;

    const refreshToken = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    return refreshToken
  }

  refreshTokenExpireDate(): Date {
    const { expires_refresh_token_days } = authConfig.jwt;

    return this.dateProvider.addDays(
      expires_refresh_token_days
    );
  }

  verifyToken(token: string): string {
    const { secret_token } = authConfig.jwt;

    const { sub: user_id } = verify(token, secret_token) as IPayload;

    return user_id
  }
}

export { JWTAuthProvider }
