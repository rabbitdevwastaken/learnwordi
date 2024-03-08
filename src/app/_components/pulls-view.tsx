import { Card } from "~/app/_components/card";
import { api } from "~/trpc/server";

type Props = {
  repo: string;
};

export const PullsView: React.FC<Props> = async ({ repo }) => {
  const pulls = await api.github.getPullRequests.query({ repo });

  console.log(pulls);

  if (pulls?.status === 401) {
    return <div>Not authorized</div>;
  }

  if (pulls?.status !== 200) {
    return <div>Failed to fetch pulls</div>;
  }

  return (
    <div className="w-full">
      <h1>Pulls for {repo}</h1>
      {pulls.data ? (
        <ul className="grid grid-cols-1 gap-3">
          {/* md:grid-cols-2 lg:grid-cols-4 */}
          {pulls.data.map((pull) => (
            <li key={pull.id}>
              <Card title={pull.title} body={pull.body ?? undefined}></Card>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
