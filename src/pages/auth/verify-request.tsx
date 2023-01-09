import Layout from "../../components/layout";
import { NextPageWithLayout } from "../_app";

const VerifyRequest = ({}) => {
  return (
    <>
      <p className="text-xl font-bold">CHECK YOUR EMAIL</p>
      <p className="text-sm font-semibold">
        A SIGN IN LINK HAS BEEN SENT TO YOUR EMAIL ADDRESS
      </p>
    </>
  );
};

VerifyRequest.getLayout = (page: NextPageWithLayout) => <Layout>{page}</Layout>;

export default VerifyRequest;
