import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Drop = () => {
  const router = useRouter();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });
  return (
    
    {drop.data ? 

    <div>
      <h1>{drop.data.name}</h1>
      <p>{drop.data.description}</p>
    </div>
    : <div>Loading...</div>}
  );
};

export default Drop;
