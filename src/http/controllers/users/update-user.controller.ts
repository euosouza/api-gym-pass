import { UsersRepository } from "@/repositories/users.repositories";
import { UsersUpdateUseCase } from "@/use-cases/users/update-user/update-user.usecase";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.string(),
  });

  const updateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { id } = updateParamsSchema.parse(request.params);
  const { name, email, password } = updateBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const userUpdateUseCase = new UsersUpdateUseCase(usersRepository);

    const user = await userUpdateUseCase.execute({ id, name, email, password_hash: password });

    return reply.status(204).send({ user });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}
