import { UsersRepository } from "@/repositories/users.repositories";
import { ListUsersUseCase } from "@/use-cases/users/list-users.usecase";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new UsersRepository();
    const usersListUseCase = new ListUsersUseCase(usersRepository);

    const users = await usersListUseCase.execute();

    return reply.status(200).send({ users });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({
        error: error.message,
      });
    }

    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}
