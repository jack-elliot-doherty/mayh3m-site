import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";

const Drop: NextPageWithLayout = () => {
  const router = useRouter();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });
  return (
    <div className="text-center">
      <h1>Drop</h1>
      <p>{drop.data?.name}</p>
      <p>{drop.data?.description}</p>
      <img src={drop.data?.image}></img>
    </div>
  );
};

Drop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Drop;
