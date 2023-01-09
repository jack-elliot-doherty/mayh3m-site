import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

import { api } from "../utils/api";
import UserAccountSideNav from "../components/UserAccountSideNav";

const Account = () => {
  const { data: session } = useSession();

  const user = api.user.getUser.useQuery(undefined, {
    enabled: session ? true : false,
  });

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <>
      <h1>Account</h1>

      <div className="w-full md:flex">
        <UserAccountSideNav />
        <div className="mr-60 w-full text-center">
          <p>Account details</p>
        </div>
      </div>
    </>
  );
};

Account.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default Account;
