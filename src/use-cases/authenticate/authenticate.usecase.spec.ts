import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";
import { AuthenticateUseCase } from "./authenticate.usecase";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

describe("Authenticate Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  test("deve retornar um usuario logado", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "teste@email.com",
      password_hash: await hash("123456", 6),
    });

    const isUserLogged = await sut.execute({
      email: "teste@email.com",
      password: "123456",
    });

    expect(isUserLogged).toEqual(expect.objectContaining({ user }));
  });

  test("deve retornar erro ao tentar logar com senha errada", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "teste@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "teste@email.com",
        password: "123456t",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("deve retornar erro ao tentar logar com email errado", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "teste@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "testes@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
