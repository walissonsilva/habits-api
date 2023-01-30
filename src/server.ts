import cors from "@fastify/cors";
import fastify from "fastify";
import { appRoutes } from "./routes";

const app = fastify();

app.register(cors);
app.register(appRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Server is listening on port 3333...");
});
