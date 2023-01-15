import { ReactElement } from "react";
import Layout from "../components/layout";

import { api } from "../utils/api";
import { NextPageWithLayout } from "./_app";
import DropCard from "../components/DropCard";

const Home: NextPageWithLayout = () => {
  const drops = api.drop.getDrops.useQuery();

  return (
    <>
      {drops.isLoading ? (
        <div>
          {/* loading spinner */}
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : drops.isError ? (
        <div>Error: {drops.error.message}</div>
      ) : (
        <>
          <h1 className=" font-bold">UPCOMING DROPS</h1>

          {drops.data?.map((drop) => {
            console.log(drop);
            return <DropCard key={drop.id} drop={drop} />;
          })}
        </>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
