import { NextPageWithLayout } from "../_app";
import { signIn, useSession } from "next-auth/react";

import Layout from "../../components/layout";

import { api } from "../../utils/api";
import AdminSideNav from "../../components/AdminSideNav";

const Applications: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  // const applications = api.application.getAllApplicationsByDrop.useQuery(
  //   {
  //     dropId: "1",
  //   },
  //   {
  //     enabled: sessionData?.user?.role === "ADMIN",
  //   }
  // );

  if (sessionData && sessionData.user?.role === "ADMIN") {
    return (
      <div className="flex w-full flex-wrap">
        <AdminSideNav />
        <h1>Applicants</h1>
        {/* {applications.data?.map((application) => {
          return (
            <div key={application.id}>
              <p>{application.userId}</p>
              <p>{application.status}</p>
              <p>{application.why}</p>
            </div>
          );
        })} */}
      </div>
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
