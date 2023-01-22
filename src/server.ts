import fastify from "fastify";

const app = fastify();

app.get("/", (req, res) => {
  return res.send({ name: "Hello world!" });
});

app.listen({ port: 3333 }, () => {
  console.log("Server is listening on port 3333...");
});
