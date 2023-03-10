import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { getSession } from "next-auth/react";
import { getCallBackUrl } from "../../../utils/getCallBackUrl";
import AdminSideNav from "../../../components/AdminSideNav";
import { useForm } from "react-hook-form";
import DropCard from "../../../components/DropCard";
import { useState } from "react";

type FormData = {
  name: string;
  description: string;
  quantity: number;
  image: string;
};

const CreateDrop = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [drop, setDrop] = useState({
    id: 0,
    name: "",
    description: "",
    image: "",
    quanity: 0,
    price: 0,
  });

  console.log(getValues());

  const updateDrop = (data: any) => {
    setDrop(data);
  };
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

            <button className="border-2 border-black" type="submit">
              Preview Drop
            </button>
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

CreateDrop.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default CreateDrop;
