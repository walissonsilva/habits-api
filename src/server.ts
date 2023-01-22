import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const habits = await prisma.habit.findMany();
  return res.send({ habits });
});

app.listen({ port: 3333 }, () => {
  console.log("Server is listening on port 3333...");
});
