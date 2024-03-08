import { z } from "zod";
import { Octokit } from "octokit";

import {
  createTRPCRouter,
  protectedProcedure,

} from "~/server/api/trpc";
export const githubRouter = createTRPCRouter({
  getCommits: protectedProcedure
    .input(z.object({ repo: z.string() }))
    .query(async ({ ctx, input }) => {

      if (!ctx.session || !ctx.session.user || !ctx.session.user.name) {
        return { status: 401, data: null }
      }

      const account = await ctx.db.query.accounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.userId, ctx.session.user.id),
      });

      if (!account) {
        throw new Error("No account found");
      }

      const octokit = new Octokit({
        auth: account.access_token,
      })

      try {
        const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
          owner: ctx.session.user.name,
          repo: input.repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })

        return commits;
      } catch (e) {
        console.log(e);
        return { status: 500, data: null }
      }
    }),
  getPullRequests: protectedProcedure
    .input(z.object({ repo: z.string() }))
    .query(async ({ ctx, input }) => {

      if (!ctx.session || !ctx.session.user || !ctx.session.user.name) {
        return { status: 401, data: null }
      }

      const account = await ctx.db.query.accounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.userId, ctx.session.user.id),
      });

      if (!account) {
        throw new Error("No account found");
      }

      const octokit = new Octokit({
        auth: account.access_token,
      })

      try {
        const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
          owner: ctx.session.user.name,
          repo: input.repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })

        return pulls;
      } catch (error) {
        console.log(error);
        return { status: 500, data: null }
      }
    }),
  getRepositories: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user || !ctx.session?.error === 'RefreshAccessTokenError') {
      return { status: 401, data: null }
    }

    const account = await ctx.db.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.userId, ctx.session.user.id),
    });

    if (!account) {
      throw new Error("No account found");
    }

    const octokit = new Octokit({
      auth: account.access_token,
    })

    const repos = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    return repos;
  }),
});
