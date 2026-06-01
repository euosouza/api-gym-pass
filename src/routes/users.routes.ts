import { remove } from "@/http/controllers/users/delete.users.controller";
import { getById } from "@/http/controllers/users/get-by-id.users.controller";
import { list } from "@/http/controllers/users/list.users.controller";
import { register } from "@/http/controllers/users/register.users.controller";
import { update } from "@/http/controllers/users/update.users.controller";
import type { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", list);
  app.get("/:id", getById);
  app.post("/", register);
  app.delete("/:id", remove);
  app.put("/:id", update);
}
