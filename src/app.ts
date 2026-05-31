import fastify from "fastify";

export const app = fastify();

app.get("/", () => {
  return {
    message: "Bem-vindo à API do GymPass",
  };
});