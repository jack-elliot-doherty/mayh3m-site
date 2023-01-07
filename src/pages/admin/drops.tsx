import { api } from "../../utils/api";

const Drops = () => {
  const drops = api.drop.getDrops.useQuery();

  if (drops.isLoading) return <div>Loading...</div>;
  if (drops.isError) return <div>Error: {drops.error.message}</div>;

  return (
    <div>
      <h1>Drops</h1>

      {drops.data?.map((drop) => {
        return (
          <div key={drop.id}>
            <p>{drop.name}</p>
            <p>{drop.description}</p>
          </div>
        );
      })}
    </div>
  );
};
