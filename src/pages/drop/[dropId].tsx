import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { NextPageWithLayout } from "../_app";
import DropApplicationForm from "../../components/DropApplicationForm";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Drop: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const dropId = router.query.dropId as string;
  const drop = api.drop.getDrop.useQuery({
    id: dropId,
  });
  console.log(drop.data);

  return (
    <>
      {drop.data ? (
        <>
          <h1 className="mb-8 text-4xl font-bold sm:text-6xl">
            {drop.data?.name}
          </h1>

          <Image
            priority
            width={600}
            height={600}
            className="m-auto "
            alt="drop preview image"
            src={drop.data?.image}
          ></Image>
          <div className="-mt-7">
            <p className="mt-3 text-xs italic">{drop.data?.description}</p>
            <p className="text-xs italic">Capacity: {drop.data.capacity}</p>
            <p className="mt-3 text-xs italic">
              Limited units to be released, only those who apply and are
              accepted will be able to purchase.
            </p>
          </div>

          {session ? (
            <DropApplicationForm dropId={dropId} />
          ) : (
            <div>
              <p className="mt-3 text-xs italic">
                You must be signed in to apply for this drop
              </p>
              <button
                className="m-2 bg-black px-3 py-2 text-sm font-bold text-white"
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      )}
    </>
  );
};

Drop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Drop;
