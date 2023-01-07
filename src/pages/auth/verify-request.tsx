import Layout from "../../components/layout";
import { NextPageWithLayout } from "../_app";

const VerifyRequest = ({}) => {
  return (
    <div className="m-60 w-3/4 max-w-md text-center sm:w-1/2">
      <p className="text-xl font-bold">CHECK YOUR EMAIL</p>
      <p className="mt-3 text-sm font-semibold">
        A SIGN IN LINK HAS BEEN SENT TO YOUR EMAIL ADDRESS.
      </p>
    </div>
  );
};

VerifyRequest.getLayout = (page: NextPageWithLayout) => <Layout>{page}</Layout>;

export default VerifyRequest;
