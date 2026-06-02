import { UsersRepository } from "@/repositories/users.repositories";
import { GetUserProfileUseCase } from "@/use-cases/users/get-user-profile/get-user-profile.usecase";

import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getParamsSchema.parse(request.params);

  try {
    const userRepository = new UsersRepository();
    const userGetProfileUseCase = new GetUserProfileUseCase(userRepository);

    const user = await userGetProfileUseCase.execute({ userId: id });

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
