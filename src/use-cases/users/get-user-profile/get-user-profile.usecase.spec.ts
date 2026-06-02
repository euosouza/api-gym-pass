import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";
import { UserNotFoundError } from "../erros/user-not-found";
import { GetUserProfileUseCase } from "./get-user-profile.usecase";

describe("Get User Profile Use Case", () => {
  let usersRepository: IUsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  test("deve buscar e retornar um usuario pelo id", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "teste@email.com",
      password_hash: await hash("123456", 6),
    });

    const isUserLogged = await sut.execute({
      userId: user.id,
    });

    expect(isUserLogged).toEqual(expect.objectContaining({ user }));
  });

  test("deve retornar erro ao tentar pegar perfil de um usuario nao existente", async () => {
    await expect(() => sut.execute({ userId: "random-id" })).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
