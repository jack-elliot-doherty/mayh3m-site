import { getSession } from "next-auth/react";
import AdminSideNav from "../../components/AdminSideNav";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { getCallBackUrl } from "../../utils/getCallBackUrl";
import { NextPageWithLayout } from "../_app";

const Drops: NextPageWithLayout = () => {
  const drops = api.drop.getDrops.useQuery();

  if (drops.isLoading) return <div>Loading...</div>;
  if (drops.isError) return <div>Error: {drops.error.message}</div>;

  return (
    <>
      <h1 className=" font-bold">DROPS</h1>

      <div className="w-full md:flex">
        <AdminSideNav />
        <div className="mr-60 w-full text-center">
          {drops.data?.map((drop) => {
            console.log(drop);
            return (
              <div className="text-center" key={drop.id}>
                <p>{drop.name}</p>
                <img className="m-auto" src={drop.image} alt={drop.name} />
                <p>{drop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
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

Drops.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Drops;
