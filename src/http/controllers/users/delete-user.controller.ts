import { UsersRepository } from "@/repositories/users.repositories";
import { DeleteUserUseCase } from "@/use-cases/users/delete-user.usecase";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteParamsSchema.parse(request.params);

  try {
    const usersRepository = new UsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    await deleteUserUseCase.execute({
      id,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        error: error.message,
      });
    }

    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}
