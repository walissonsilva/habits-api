import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

export function appRoutes(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    const habits = await prisma.habit.findMany();
    return res.send({ habits });
  });
}
