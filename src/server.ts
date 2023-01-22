import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const app = fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/", async (req, res) => {
  const habits = await prisma.habit.findMany();
  return res.send({ habits });
});

app.listen({ port: 3333 }, () => {
  console.log("Server is listening on port 3333...");
});
