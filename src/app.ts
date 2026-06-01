import fastify from "fastify";
import { userRoutes } from "./routes/users.routes";

export const app = fastify();

app.register(userRoutes, { prefix: "/users" });
