import fastify from "fastify";
import { ZodError } from "zod";
import { userRoutes } from "./routes/users.routes";
import { env } from "process";

export const app = fastify();

app.register(userRoutes, { prefix: "/users" });
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.issues,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
