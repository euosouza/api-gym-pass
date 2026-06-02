import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { UserAlreadyExistsError } from "../erros/user-already-exists";
import { RegisterUserUseCase } from "./register-user.usecase";
import { compare } from "bcryptjs";

describe("Register User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: RegisterUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserUseCase(usersRepository);
  });

  test("deve retornar erro 409 quando usuario já cadastrado", async () => {
    const email = "teste@email.com";

    await sut.execute({ name: "John Doe", email, password: "123456" });

    await expect(async () => {
      await sut.execute({
        name: "Jane Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  test("deve cadastrar usuario", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "teste@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("deve validar hash da senha", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "teste@email.com",
      password: "123456",
    });

    const isPasswordValid = await compare("123456", user.password_hash);

    expect(isPasswordValid).toBe(true);
  });
});
