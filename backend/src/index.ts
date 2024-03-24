import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const app = new Hono<{
  Bindings: { DATABASE_URL: string };
}>();

app.post("/api/v1/user/signup", async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  return c.text("Signup page");
});

app.post("/api/v1/user/login", (c) => {
  return c.text("Login page");
});

app.post("/api/v1/blog", (c) => {
  return c.text("Blog page");
});

app.put("/api/v1/blog", (c) => {
  return c.text("blog page");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Blog page");
});

export default app;
