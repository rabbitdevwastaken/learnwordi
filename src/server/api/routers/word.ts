import { z } from "zod";
import { eq, desc } from 'drizzle-orm';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { words, definitions } from "~/server/db/schema";

export const wordRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(2),
      definition: z.string().min(2),
      definitions: z.array(z.string()).min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const result = await tx.insert(words).values({
          name: input.name,
          definition: input.definition,
          createdById: ctx.session.user.id,
        }).returning({ wordId: words.id });

        const wordId = result[0]?.wordId;
        if (!wordId) {
          throw new Error("Failed to create word");
        }

        await tx.insert(definitions).values(
          input.definitions.map((definition) => ({
            wordId,
            definition,
          }))
        );
      });
    }),

  updateSelected: protectedProcedure
    .input(z.object({
      wordId: z.number(),
      selected: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.update(words)
        .set({ selected: input.selected })
        .where(eq(words.id, input.wordId));
    }),

  updateDefinition: protectedProcedure
    .input(z.object({
      wordId: z.number(),
      definition: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.update(words)
        .set({ definition: input.definition })
        .where(eq(words.id, input.wordId))
        .returning({ wordId: words.id, definition: words.definition });
    }),

  remove: protectedProcedure
    .input(z.object({
      wordId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(words)
        .where(eq(words.id, input.wordId));
    }),

  getMany: protectedProcedure.query(({ ctx }) => {

    return ctx.db.select()
      .from(words)
      .where(eq(words.createdById, ctx.session.user.id))
      .orderBy(desc(words.createdAt))
      .innerJoin(definitions, eq(words.id, definitions.wordId))
      .all();
  }),
});
