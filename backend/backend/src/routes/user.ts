import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  sign,verify } from 'hono/jwt'
import { signinInput, signupInput } from "@krishnadev7/medium-common";

export const userRouter = new Hono<{
    Bindings: {DATABASE_URL: string,JWT_SECERET: string}
}>();

userRouter.post("/signup", async(c) => {

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.username,
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
  
  userRouter.post("/login", async(c) => {

    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    
    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const {username,password} = await c.req.json();
  
    const user = await prisma.user.findUnique({
      where: {
        email: username,
        password: password
      }
    })
  
    if(!user){
      c.status(403);
      return c.json({error: "User not found"});
    }
  
    const jwt = await sign({id: user.id},c.env.JWT_SECERET);
    return c.json({jwt});
  });