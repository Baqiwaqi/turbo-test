import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

// import { desc, eq } from "@acme/db";
// import { CreatePostSchema, Post } from "@acme/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";
import {getDataBase} from "@komit/db/client";

const db = getDataBase({
  endpoint: process.env.COSMOS_DB_ENDPOINT,
  key: process.env.COSMOS_DB_KEY,
});

export const postRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    // return ctx.db.query.Post.findMany({
    //   orderBy: desc(Post.id),
    //   limit: 10,
    // });

    // const res = await db.getContainer("addresses").items.readAll().fetchAll();

    // return res.resources;

    console.log("hello get all posts response")
    return [
      {
        id: "1",
        title: "heelo",
        content: "heelo",
      },
      { 
        id: "2",
        title: "heelo",
        content: "heelo",
      },
      {
        id: "3",
        title: "heelo",
        content: "heelo",
      }
    ]
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      // return ctx.db.query.Post.findFirst({
      //   where: eq(Post.id, input.id),
      // });
      return "heelo"
    }),

  // create: protectedProcedure
  //   .input(CreatePostSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(Post).values(input);
  //   }),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(Post).where(eq(Post.id, input));
  // }),
} satisfies TRPCRouterRecord;
