import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { getSession } from "next-auth/react";
import { getCallBackUrl } from "../../../utils/getCallBackUrl";
import AdminSideNav from "../../../components/AdminSideNav";
import { useForm } from "react-hook-form";
import DropCard from "../../../components/DropCard";

const createDrop = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  console.log(getValues());

  return (
    <>
      <h1 className=" font-bold">DROPS</h1>

      <div className="w-full md:flex">
        <AdminSideNav />
        <div className="mr-60 w-full text-center">
          <p>create drop</p>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input
              className="border-2 border-black"
              type="text"
              {...register("name", { required: true })}
            />
            <input
              className="border-2 border-black"
              type="text"
              {...register("description", { required: true })}
            />

            <input
              className="border-2 border-black"
              type="text"
              {...register("quantity", { required: true })}
            />
            <input
              className="border-2 border-black"
              type="text"
              {...register("image", { required: true })}
            />

            <input className="border-2 border-black" type="submit" />
          </form>
          {/* <DropCard drop={getValues()} /> */}
        </div>
      </div>
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

createDrop.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default createDrop;
