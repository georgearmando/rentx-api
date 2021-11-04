import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetUserPasswordUseCase
    );

    await resetPasswordUserUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordUserController };
