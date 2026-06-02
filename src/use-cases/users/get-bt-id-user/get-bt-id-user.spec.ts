import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";
import { UserNotFoundError } from "../erros/user-not-found";
import { GetByIDUseCase } from "./get-bt-id-user.usecase";

describe("Get By Id User Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: GetByIDUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetByIDUseCase(usersRepository);
  });

  test("deve retornar erro 404 quando usuario não encontrado", async () => {
    await expect(async () => {
      await sut.execute({
        id: "1",
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  test("deve buscar o usuario pelo id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      password_hash: await hash("123456", 6),
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
