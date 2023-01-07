import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Drop = () => {
  const router = useRouter();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });
  return (
    <div>
      <h1>Drop</h1>
      <p>{drop.data?.name}</p>
      <p>{drop.data?.description}</p>
    </div>
  );
};

export default Drop;
