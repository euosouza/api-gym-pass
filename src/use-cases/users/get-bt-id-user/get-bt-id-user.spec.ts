import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { UserNotFoundError } from "../erros/user-not-found";
import { RegisterUserUseCase } from "../register-user/register-user.usecase";
import { GetByIDUseCase } from "./get-bt-id-user.usecase";

describe("Get By Id User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: GetByIDUseCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetByIDUseCase(usersRepository);
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  test("deve retornar erro 404 quando usuario não encontrado", async () => {
    await expect(async () => {
      await sut.execute({
        id: "1",
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  test("deve buscar o usuario pelo id", async () => {
    const { user } = await registerUserUseCase.execute({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password: "123456",
    });

    const userFind = await sut.execute({
      id: user.id,
    });

    expect(userFind).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.password_hash,
      }),
    );
  });
});
