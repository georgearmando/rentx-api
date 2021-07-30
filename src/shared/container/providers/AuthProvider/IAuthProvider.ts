interface IAuthProvider {
  generateToken(user_id: string): string;
  verifyToken(token: string): string;
}

export { IAuthProvider }
