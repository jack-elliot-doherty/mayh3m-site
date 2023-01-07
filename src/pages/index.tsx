import { type NextPage } from "next";
import { ReactElement, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../components/layout";
import { signIn } from "next-auth/react";

import { api } from "../utils/api";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl">Congratulations</h1>
        <h2 className="text-3xl">
          Welcome to Mayh<span className="text-red-600">3</span>m Clothing
        </h2>
        <p className="text-xl">
          By F<span className="text-red-600">3</span>Z
        </p>
      </div>
      <div className="text-center text-lg">hello</div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
