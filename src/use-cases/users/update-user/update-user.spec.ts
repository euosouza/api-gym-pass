import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";
import { UserNotFoundError } from "../erros/user-not-found";
import { RegisterUserUseCase } from "../register-user/register-user.usecase";
import { UsersUpdateUseCase } from "./update-user.usecase";

describe("Updade User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: UsersUpdateUseCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersUpdateUseCase(usersRepository);
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  test("deve retornar erro 404 quando usuario não encontrado", async () => {
    await expect(async () => {
      await sut.execute({
        id: "1",
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  test("deve atualizar usuario", async () => {
    const { user } = await registerUserUseCase.execute({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password: "123456",
    });

    const userUpdated = {
      id: user.id,
      name: "Nome Alterado",
      email: "email_alterado@email.com",
      password_hash: "1234567",
    };

    const passwordHash = await hash(userUpdated.password_hash as string, 6);
    userUpdated.password_hash = passwordHash;

    await sut.execute({
      id: user.id,
      name: userUpdated.name,
      email: userUpdated.email,
      password_hash: userUpdated.password_hash,
    });

    const userFind = await usersRepository.findById({ id: user.id });

    expect(userFind).toEqual(
      expect.objectContaining({
        id: user.id,
        name: userUpdated.name,
        email: userUpdated.email,
        password_hash: userUpdated.password_hash,
      }),
    );
  });
});
