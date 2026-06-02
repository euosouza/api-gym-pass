import { remove } from "@/http/controllers/users/delete-user.controller";
import { getById } from "@/http/controllers/users/get-by-id-user.controller";
import { getProfile } from "@/http/controllers/users/get-user-profile.controller";
import { list } from "@/http/controllers/users/list-users.controller";
import { register } from "@/http/controllers/users/register-user.controller";
import { update } from "@/http/controllers/users/update-user.controller";
import type { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", list);
  app.get("/:id", getById);
  app.post("/", register);
  app.delete("/:id", remove);
  app.put("/:id", update);
  app.get("/profile/:id", getProfile);
}
