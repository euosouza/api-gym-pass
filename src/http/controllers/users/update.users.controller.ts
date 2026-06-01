import { prisma } from "@/lib/prisma";
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

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return reply.status(404).send({
      message: "User not found",
    });
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return reply.status(204).send();
}
