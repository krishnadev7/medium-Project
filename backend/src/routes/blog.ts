import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";


export const blogRouter = new Hono<{
    Bindings: {DATABASE_URL: string, JWT_SECERET: string}
}>();

blogRouter.post("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const {title,content} = await c.req.json();

    try {
        
    const blog = await prisma.post.create({
        data: {
            title,
            content,
            authorId: 1
        }
    })

    return c.json({id: blog.id})
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({error,message:"post creation failed!"});
    }

  });
  
  blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const {title,content,id} = await c.req.json();

    try {
        
    const blog = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title,
            content
        }
    })

    return c.json({id: blog.id})
    } catch (error) {
        console.log(error);
        c.status(500);
        c.json({error,message:"updating post failed"});
    }

});
  
  blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const {id} = await c.req.json();

    try {
        const blog = await prisma.post.findFirst({
            where: {id}
        })

        return c.json({blog});

    } catch (error) {
        c.status(500);
        return c.json({error,message:"error while fetching blog post"});
    }
    
  });
  
  blogRouter.get ("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json({blogs});
    
  });