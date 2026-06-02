import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { RegisterUserUseCase } from "../register-user/register-user.usecase";
import { ListUsersUseCase } from "./list-users.usecase";

describe("List User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: ListUsersUseCase;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUsersUseCase(usersRepository);
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  test("deve retornar todos os usuarios", async () => {
    const { user } = await registerUserUseCase.execute({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password: "123456",
    });

    const users = await sut.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: user.id,
          name: user.name,
          email: user.email,
          password_hash: user.password_hash,
        }),
      ]),
    );
  });
});
