import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@krishnadev7/medium-common";


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
        message: "You are not loggedin",
      });
    }
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({message: "You are not loggedin" });
  }
});

blogRouter.post("/", async (c) => {

  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
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

  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }  

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content, id } = await c.req.json();

  try {
    const blog = await prisma.blog.update({
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

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blogs = await prisma.blog.findMany();
  
    return c.json({ blogs });
  });

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
    });

    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({ error, message: "error while fetching blog post" });
  }
});


