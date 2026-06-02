import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";
import { ListUsersUseCase } from "./list-users.usecase";

describe("List User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: ListUsersUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUsersUseCase(usersRepository);
  });

  test("deve retornar todos os usuarios", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password_hash: await hash("123456", 6),
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
