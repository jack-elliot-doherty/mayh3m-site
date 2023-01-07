import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Drop = () => {
  const router = useRouter();

  const dropId = router.query.dropId as string;
  const drops = api.drop.getDrop.useQuery({
    id: dropId,
  });

  if (drops.isLoading) return <div>Loading...</div>;
  if (drops.isError) return <div>Error: {drops.error.message}</div>;

  return (
    <div>
      <h1>{data.drop.name}</h1>
      <p>{data.drop.description}</p>
      <p>{data.drop.price}</p>
      <p>{data.drop.quantity}</p>
      <p>{data.drop.releaseDate}</p>
      <p>{data.drop.releaseTime}</p>
    </div>
  );
};

export default Drop;
