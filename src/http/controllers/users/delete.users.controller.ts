import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteParamsSchema.parse(request.params);

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

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return reply.status(204).send();
}
