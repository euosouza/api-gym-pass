import { UsersRepository } from "@/repositories/users.repositories";
import { GetByIDUseCase } from "@/use-cases/users/get-bt-id-user/get-bt-id-user.usecase";

import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getParamsSchema.parse(request.params);

  try {
    const userRepository = new UsersRepository();
    const userGetByIdUseCase = new GetByIDUseCase(userRepository);

    const user = await userGetByIdUseCase.execute({ id });

    return reply.status(200).send({ user });
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
