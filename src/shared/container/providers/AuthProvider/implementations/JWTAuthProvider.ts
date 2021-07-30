import { sign, verify } from "jsonwebtoken";
import { IAuthProvider } from "../IAuthProvider";
import authConfig from '@config/auth';

interface IPayload {
  sub: string;
}

class JWTAuthProvider implements IAuthProvider {
  generateToken(user_id: string): string {
    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn
    });

    return token
  }

  verifyToken(token: string): string {
    const { secret } = authConfig.jwt;

    const { sub: user_id } = verify(token, secret) as IPayload;

    return user_id
  }
}

export { JWTAuthProvider }
