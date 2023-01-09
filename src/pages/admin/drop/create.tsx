import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { getSession } from "next-auth/react";
import { getCallBackUrl } from "../../../utils/getCallBackUrl";

const createDrop = () => {
  return <p>hello</p>;
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

createDrop.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default createDrop;
