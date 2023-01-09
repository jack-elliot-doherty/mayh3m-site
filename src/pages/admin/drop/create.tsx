import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { getSession } from "next-auth/react";

const createDrop = () => {
  return <p>hello</p>;
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=${"http%3A%2F%2Flocalhost%3A3000%2F"}drop%2F${
          context.params.dropId
        }%2F`,
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
