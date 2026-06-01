import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getParamsSchema.parse(request.params);

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

  return reply.status(200).send({ user });
}
