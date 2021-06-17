import { AppError } from "../../../../errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let user: ICreateUserDTO;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);

    user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
      driver_license: '123456'
    }
  });

  it('Should be able to authenticate an user', async () => {
    await createUserUseCase.execute(user);

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(userAuthenticated).toHaveProperty('token');
  });

  it('Should not be able to authenticate a non exists user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: '12345'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a incorrect password', async () => {
    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: 'incorrect-password'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
