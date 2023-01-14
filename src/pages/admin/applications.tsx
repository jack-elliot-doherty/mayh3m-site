import { NextPageWithLayout } from "../_app";
import { getSession, signIn, useSession } from "next-auth/react";

import Layout from "../../components/layout";

import { api } from "../../utils/api";
import AdminSideNav from "../../components/AdminSideNav";
import { getCallBackUrl } from "../../utils/getCallBackUrl";

const Applications: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  const applications = api.application.getAllApplications.useQuery(undefined, {
    enabled: sessionData?.user?.role === "ADMIN",
  });

  const updateApplication = api.application.updateApplication.useMutation({
    onMutate: (variables) => {
      applications.data?.forEach((application) => {
        if (application.id === variables.id) {
          application.status = variables.status;
        }
      });
    },
  });

  const handleUpdateApplication = (id: string, status: string) => {
    updateApplication.mutate({ id, status });
  };

  if (sessionData && sessionData.user?.role === "ADMIN") {
    return (
      <>
        <h1 className="font-bold">APPLICATIONS</h1>

        <div className="w-full md:flex">
          <AdminSideNav />
          <div className="mr-60 w-full space-y-4 text-center">
            {applications.data?.map((application) => {
              console.log(application);
              if (application.status === "PENDING") {
                return (
                  <div
                    className="mx-auto w-1/2 border p-3 shadow-lg"
                    key={application.id}
                  >
                    <h1 className="font-bold">Reason given:</h1>
                    <p className="p-5 text-lg font-semibold">
                      {application.why}
                    </p>
                    <button
                      className="
                  m-2 border border-black bg-black p-2 text-white"
                      onClick={() => {
                        handleUpdateApplication(application.id, "ACCEPTED");
                      }}
                    >
                      ACCEPT
                    </button>
                    <button
                      className=" m-2 border border-black bg-white p-2
                  text-black"
                      onClick={() => {
                        handleUpdateApplication(application.id, "DENIED");
                      }}
                    >
                      DENY
                    </button>
                  </div>
                );
              }
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
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const callbackUrl = getCallBackUrl(context.req.headers.referer);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=${callbackUrl}`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

Applications.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Applications;
