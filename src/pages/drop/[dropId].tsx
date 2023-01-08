import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";
import DropApplicationForm from "../../components/DropApplicationForm";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Drop = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery(
    {
      id: dropId,
    },
    { enabled: session ? true : false }
  );
  const hasApplied = api.user.hasUSerApplied.useQuery(
    { dropId: dropId },
    { enabled: session ? true : false }
  );

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=%2Fdrop/{dropId}`,
        permanent: false,
      },
    };
  }

  return (
    <>
      {drop.data ? (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold">{drop.data?.name}</h1>
            <img alt="drop preview image" src={drop.data?.image}></img>
            <p className="font-bold">{drop.data?.description}</p>
            <p className="text-xs italic">Capacity: 100</p>
            <p className="text-xs italic">Places remaining: 32</p>
          </div>

          <DropApplicationForm dropId={dropId} userId={"2"} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

Drop.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default Drop;
