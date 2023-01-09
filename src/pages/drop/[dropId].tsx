import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";
import DropApplicationForm from "../../components/DropApplicationForm";
import { getSession } from "next-auth/react";
import { getCallBackUrl } from "../../utils/getCallBackUrl";

const Drop: NextPageWithLayout = () => {
  const router = useRouter();
  // const { data: session } = useSession();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });

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

          <DropApplicationForm dropId={dropId} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const callbackUrl = getCallBackUrl(
    context.req.headers.referer,
    context.resolvedUrl
  );

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

Drop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Drop;
