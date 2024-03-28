import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  sign,verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {DATABASE_URL: string,JWT_SECERET: string}
}>();

userRouter.post("/signup", async(c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
    
      const token = await sign({id: user.id},c.env.JWT_SECERET);
    
      return c.json({
        jwt: token
      })
    } catch (error) {
      console.log(error); 
      c.status(411);
      return c.text('invalid');
    }
  });
  
  userRouter.post(" /login", async(c) => {
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