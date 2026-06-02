import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { UserNotFoundError } from "../erros/user-not-found";
import { RegisterUserUseCase } from "../register-user/register-user.usecase";
import { DeleteUserUseCase } from "./delete-user.usecase";

describe("Delete User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: DeleteUserUseCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  test("deve retornar erro 404 quando usuario não encontrado", async () => {
    await expect(async () => {
      await sut.execute({
        id: "1",
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  test("deve deletar usuario", async () => {
    const { user } = await registerUserUseCase.execute({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password: "123456",
    });

    await sut.execute({
      id: user.id,
    });

    const userExists = await usersRepository.findById({ id: user.id });

    expect(userExists).toEqual(null);
  });
});
