// import { prisma } from "@/lib/prisma";
// import type { FastifyInstance } from "fastify";
// import z from "zod";

// export async function gymRoutes(app: FastifyInstance) {
//   app.get("/", async (request, reply) => {
//     const gyms = await prisma.gym.findMany();

//     return reply.status(200).send({ gyms });
//   });

//   app.get("/:id", async (request, reply) => {
//     const getParamsSchema = z.object({
//       id: z.string(),
//     });

//     const { id } = getParamsSchema.parse(request.params);

//     const gym = await prisma.gym.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!gym) {
//       return reply.status(404).send({
//         message: "Gym not found",
//       });
//     }

//     return reply.status(200).send({ gym });
//   });

//   app.post("/", async (request, reply) => {
//     const registerBodySchema = z.object({
//       name: z.string(),
//       email: z.string().email(),
//       password: z.string().min(6),
//     });

//     const { name, email, password } = registerBodySchema.parse(request.body);

//     const gymAlreadyExists = await prisma.gym.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (gymAlreadyExists) {
//       return reply.status(400).send({
//         message: "gym already exists",
//       });
//     }

//     await prisma.gym.create({
//       data: {
//         name,
//         email,
//         password_hash: password,
//       },
//     });

//     return reply.status(201).send();
//   });

//   app.delete("/:id", async (request, reply) => {
//     const deleteParamsSchema = z.object({
//       id: z.string(),
//     });

//     const { id } = deleteParamsSchema.parse(request.params);

//     const gym = await prisma.gym.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!gym) {
//       return reply.status(404).send({
//         message: "gym not found",
//       });
//     }

//     await prisma.gym.delete({
//       where: {
//         id,
//       },
//     });

//     return reply.status(204).send();
//   });

//   app.put("/:id", async (request, reply) => {
//     const updateParamsSchema = z.object({
//       id: z.string(),
//     });

//     const updateBodySchema = z.object({
//       name: z.string(),
//       email: z.string().email(),
//       password: z.string().min(6),
//     });

//     const { id } = updateParamsSchema.parse(request.params);
//     const { name, email, password } = updateBodySchema.parse(request.body);

//     const gym = await prisma.gym.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!gym) {
//       return reply.status(404).send({
//         message: "gym not found",
//       });
//     }

//     await prisma.gym.update({
//       where: {
//         id,
//       },
//       data: {
//         name,
//         email,
//         password_hash: password,
//       },
//     });

//     return reply.status(204).send();
//   });
// }
