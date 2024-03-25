import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  sign,verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: { DATABASE_URL: string, JWT_SECERET: string };
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header('authorization') || "";
  const token = header.split(" ")[1];

  const response = await verify(token,c.env.JWT_SECERET);

  if(response.id){
    await next();
  }else{
    c.status(403);
    return c.json({error:"unauthorized"});
  }
  
})

app.post("/api/v1/user/signup", async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  });

  const token = await sign({id: user.id},c.env.JWT_SECERET);

  return c.json({
    jwt: token
  })
});

app.post("/api/v1/user/login", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {email,password} = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(!user){
    c.status(403);
    return c.json({error: "User not found"});
  }

  const jwt = await sign({id: user.id},c.env.JWT_SECERET);
  return c.json({jwt});
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
