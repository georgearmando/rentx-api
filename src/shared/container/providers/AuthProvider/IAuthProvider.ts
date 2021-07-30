interface IAuthProvider {
  generateToken(user_id: string): string;
  generateRefreshToken(email: string, user_id: string): string;
  refreshTokenExpireDate(): Date;
  verifyToken(token: string): string;
}

export { IAuthProvider }
