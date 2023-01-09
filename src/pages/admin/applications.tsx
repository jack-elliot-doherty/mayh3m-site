import { NextPageWithLayout } from "../_app";
import { signIn, useSession } from "next-auth/react";

import Layout from "../../components/layout";

import { api } from "../../utils/api";
import AdminSideNav from "../../components/AdminSideNav";

const Applications: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  const applications = api.application.getAllApplications.useQuery(undefined, {
    enabled: sessionData?.user?.role === "ADMIN",
  });

  if (sessionData && sessionData.user?.role === "ADMIN") {
    return (
      <>
        <h1 className="font-bold">APPLICATIONS</h1>

        <div className="w-full md:flex">
          <AdminSideNav />
          <div className="mr-60 w-full text-center">
            {applications.data?.map((application) => {
              console.log(application);
              return (
                <div key={application.id}>
                  <p>{application.why}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>Not Authorized</h1>
      </div>
    );
  }
};

Applications.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Applications;
