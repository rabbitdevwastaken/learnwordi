import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { Octokit } from "octokit";

export const githubRouter = createTRPCRouter({
  getRepositories: protectedProcedure.query(async ({ ctx }) => {

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
