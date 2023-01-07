import { NextPageWithLayout } from "../_app";
import { signIn, useSession } from "next-auth/react";

import Layout from "../../components/layout";

import { api } from "../../utils/api";

const Applications: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  const applications = api.application.getAllApplications.useQuery(undefined, {
    enabled: sessionData?.user?.role === "admin",
  });

  if (sessionData && sessionData.user?.role === "admin") {
    return (
      <>
        <h1>Applicants</h1>
        {applications.data?.map((application) => {
          return (
            <div key={application.id}>
              <p>{application.name}</p>
              <p>{application.email}</p>
              <p>{application.why}</p>
            </div>
          );
        })}
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
