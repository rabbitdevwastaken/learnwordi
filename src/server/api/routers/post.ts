import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      // only created by the current user
      where: (posts, { eq }) => eq(posts.createdById, ctx.session.user.id),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  getRepositories: protectedProcedure.query(() => {
    return [
      { name: "tRPC", url: ""}
    ];
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
