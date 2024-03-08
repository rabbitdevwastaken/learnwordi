"use client";

import { useRouter, usePathname } from "next/navigation";

type Props = {
  repo: string;
  repos: string[];
};

export const RepoSelect: React.FC<Props> = ({ repos, repo }) => {
  console.log({ repos, repo });
  const router = useRouter();
  const pathname = usePathname();
  const onRepoSelected = (repo: string) => {
    const repoSubPath = pathname.includes("pulls") ? "pulls" : "commits";
    router.push(`/github/${repo}/${repoSubPath}`);
  };

  return (
    <>
      <h1>
        Select a repository to view{" "}
        {pathname.includes("pulls") ? "pull requests" : "commits"}
      </h1>
      <select
        value={repo}
        className="select select-primary w-full"
        onChange={(e) => onRepoSelected(e.target.value)}
      >
        {repos.map((repo) => (
          <option key={repo} value={repo}>
            {repo}
          </option>
        ))}
      </select>
    </>
  );
};
