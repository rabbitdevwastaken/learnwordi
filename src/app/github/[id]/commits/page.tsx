import { CommitsView } from "~/app/_components/commits-view";
import { RepoTypeSelect } from "~/app/_components/repo-type-select";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <RepoTypeSelect type="commits" repo={params.id} />
      <CommitsView repo={params.id} />
    </>
  );
}
