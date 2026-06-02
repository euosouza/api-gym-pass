import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { UserNotFoundError } from "../erros/user-not-found";
import { DeleteUserUseCase } from "./delete-user.usecase";
import { hash } from "bcryptjs";

describe("Delete User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  test("deve retornar erro 404 quando usuario não encontrado", async () => {
    await expect(async () => {
      await sut.execute({
        id: "1",
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  test("deve deletar usuario", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password_hash: await hash("123456", 6),
    });

    await sut.execute({
      id: user.id,
    });

    const userExists = await usersRepository.findById({ id: user.id });

    expect(userExists).toEqual(null);
  });
});
