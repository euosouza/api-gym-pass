import { UsersRepository } from "@/repositories/users.repositories";
import { AuthenticateUseCase } from "@/use-cases/authenticate/authenticate.usecase";
import { InvalidCredentialsError } from "@/use-cases/authenticate/errors/invalid-credentials";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const requetsBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = requetsBodySchema.parse(request.body);

  try {
    const repository = new UsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(repository);

    const user = await authenticateUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
