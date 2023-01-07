import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";
import DropApplicationForm from "../../components/DropApplicationForm";

const Drop: NextPageWithLayout = () => {
  const router = useRouter();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">{drop.data?.name}</h1>
        <img src={drop.data?.image}></img>
        <p className="font-bold">{drop.data?.description}</p>
        <p>capacity: 100</p>
        <p>places remainaing: 32</p>
      </div>

      <DropApplicationForm dropId={dropId} userId={"2"} />
    </>
  );
};

Drop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Drop;
