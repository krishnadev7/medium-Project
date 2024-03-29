import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECERET: string };
  Variables: { userId: string };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECERET);

    if (user) {
      c.set("userId", user.id);
     await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error, message: "internal error" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const { title, content } = await c.req.json();

  try {
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId: authorId,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error, message: "post creation failed!" });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content, id } = await c.req.json();

  try {
    const blog = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    console.log(error);
    c.status(500);
    c.json({ error, message: "updating post failed" });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = await c.req.json();

  try {
    const blog = await prisma.post.findFirst({
      where: { id },
    });

    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({ error, message: "error while fetching blog post" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany();

  return c.json({ blogs });
});
