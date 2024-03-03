import { View } from "../_components/layout/view";
import { api } from "~/trpc/server";

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const repositories = await api.github.getRepositories.query();

  if (repositories?.status === 401) {
    return <div>Not authorized</div>;
  }

  if (repositories?.status !== 200) {
    return <div>Failed to fetch repositories</div>;
  }

  return (
    <View>
      <div>
        <h1>Dashboard</h1>
        <div className="flex  items-center gap-2">
          {repositories.data ? (
            <ul>
              {repositories.data.map((repo) => (
                <li key={repo.id}>{repo.name}</li>
              ))}
            </ul>
          ) : (
            <div>Loading...</div>
          )}
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </div>
    </View>
  );
}
