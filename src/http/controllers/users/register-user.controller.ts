import { UsersRepository } from "@/repositories/users.repositories";
import { UserAlreadyExistsError } from "@/use-cases/users/erros/user-already-exists";
import { RegisterUserUseCase } from "@/use-cases/users/register-user.usecase";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository);

    const user = await registerUserUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({
      user,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        error: error.message,
      });
    }

    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}
