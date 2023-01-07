import { type NextPage } from "next";
import { ReactElement, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../components/layout";
import { signIn } from "next-auth/react";

import { api } from "../utils/api";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";
import DropCard from "../components/DropCard";

const Home: NextPageWithLayout = () => {
  const drops = api.drop.getDrops.useQuery();

  return (
    <div className="text-center text-lg">
      {drops.isLoading ? (
        <div>Loading...</div>
      ) : drops.isError ? (
        <div>Error: {drops.error.message}</div>
      ) : (
        <div>
          <h1 className="mb-5 font-bold">UPCOMING DROPS</h1>

          {drops.data?.map((drop) => {
            console.log(drop);
            return <DropCard key={drop.id} drop={drop} />;
          })}
        </div>
      )}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
