import React from "react";
import { api } from "~/trpc/server";
import { RepoSelect } from "../_components/repo-select";
import { signIn } from "next-auth/react";

export default async function ReposMobileView() {
  const repositories = await api.github.getRepositories.query();

  if (repositories?.status === 401) {
    void signIn("github");
  }

  if (repositories?.status !== 200) {
    return <div>Failed to fetch repositories</div>;
  }

  return (
    <>
      {repositories.data && (
        <RepoSelect repos={repositories.data.map((repo) => repo.name)} />
      )}
    </>
  );
}
