import { authenticate } from "@/http/controllers/authenticate/authenticate.controller";
import type { FastifyInstance } from "fastify";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/", authenticate);
}
