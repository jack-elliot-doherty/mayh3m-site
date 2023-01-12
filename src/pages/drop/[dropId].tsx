import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";
import DropApplicationForm from "../../components/DropApplicationForm";
import { getSession } from "next-auth/react";
import { getCallBackUrl } from "../../utils/getCallBackUrl";
import Image from "next/image";

const Drop: NextPageWithLayout = () => {
  const router = useRouter();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });
  console.log(drop.data);

  return (
    <>
      {drop.data ? (
        <>
          <div className="w-3/4 text-center">
            <h1 className="mb-2 text-3xl font-bold">{drop.data?.name}</h1>
            <Image
              priority
              width={600}
              height={600}
              className="m-auto "
              alt="drop preview image"
              src={drop.data?.image}
            ></Image>
            <p className="mt-5 font-bold">{drop.data?.description}</p>
            <p className="text-xs italic">Capacity: {drop.data.capacity}</p>
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

Drop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Drop;
