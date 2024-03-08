import React from "react";
import { RepoSelect } from "~/app/_components/repo-select";
import { api } from "~/trpc/server";

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export default async function ReposMobileView({ children, params }: Props) {
  const repositories = await api.github.getRepositories.query();

  if (repositories?.status === 401) {
  }

  if (repositories?.status !== 200) {
    return <div>Failed to fetch repositories</div>;
  }

  return (
    <>
      {repositories.data && (
        <RepoSelect
          repo={params.id}
          repos={repositories.data.map((repo) => repo.name)}
        />
      )}
      {children}
    </>
  );
}
