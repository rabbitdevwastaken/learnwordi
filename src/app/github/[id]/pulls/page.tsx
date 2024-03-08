import { PullsView } from "~/app/_components/pulls-view";
import { RepoTypeSelect } from "~/app/_components/repo-type-select";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <RepoTypeSelect type="commits" repo={params.id} />
      <PullsView repo={params.id} />
    </>
  );
}
