import { type NextPage } from "next";
import { ReactElement } from "react";
import Layout from "../../components/layout";
import { NextPageWithLayout } from "../_app";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const Verify: NextPageWithLayout = () => {
  const { query } = useRouter();
  const applicant = api.applicant.getApplicant.useQuery({
    id: query.userId as string,
  });
  return (
    <main className="flex min-h-screen items-center justify-center font-semibold">
      <div className="container flex flex-col items-center justify-center px-4 py-16 ">
        <img
          alt="Mayh3m logo"
          title="Mayh3m logo"
          src="/static/img/logo.png"
        ></img>
        <p className="text-3xl my-5">You&apos;re in.</p>
        <p className="text-2xl">{applicant.data?.name}...</p>
        <p className="text-3xl mt-1">
          Welcome to Mayh<span className="text-red-600">3</span>m.
        </p>
        <p className="mt-5">Keep an eye on your email for updates from us.</p>

      </div>
    </main>
  );
};

Verify.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Verify;
