interface IAuthProvider {
  generateToken(user_id: string): string;
  generateRefreshToken(email: string, user_id: string): string;
  verifyToken(token: string): string;
  verifyRefreshToken(refresh_token: string): {};
}

export { IAuthProvider }
