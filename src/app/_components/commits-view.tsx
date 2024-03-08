import { Card } from "~/app/_components/card";
import { api } from "~/trpc/server";

type Props = {
    repo: string;
};

export const CommitsView: React.FC<Props> = async ({ repo }) => {
  const commits = await api.github.getCommits.query({ repo });

  if (commits?.status === 401) {
    return <div>Not authorized</div>;
  }

  if (commits?.status !== 200) {
    return <div>Failed to fetch commits</div>;
  }

  return (
    <div className="w-full">
      <h1>Commits for {repo}</h1>
      {commits.data ? (
        <ul className="grid grid-cols-1 gap-3">
          {/* md:grid-cols-2 lg:grid-cols-4 */}
          {commits.data.map((commit) => (
            <li key={commit.sha}>
              <Card
                title={commit.commit.message}
                body={commit.commit.message}
              ></Card>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
