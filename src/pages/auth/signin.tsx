import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/layout";
import { FaDiscord, FaGoogle } from "react-icons/fa";

const SignIn = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(providers);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <div className="w-3/4 max-w-md text-center sm:w-1/2">
      <h1 className="font-bold">SIGN IN</h1>

      <div className="mt-4">
        <form method="post" action="/api/auth/signin/email">
          <div>
            <div>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            </div>
            <div>
              <input
                className="w-full border p-3 text-xs focus:outline-none"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <button
                className="w-full bg-black p-3 text-xs font-semibold text-white"
                type="submit"
              >
                SIGN IN
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 inline-flex w-full items-center justify-center">
        <hr className="my-8 h-px w-full rounded border-0  bg-gray-700" />
        <div className="absolute left-1/2 -translate-x-1/2 bg-white px-4 ">
          <h1 className="">OR</h1>
        </div>
      </div>

      <div className="">
        {providers
          ? Object.values(providers).map((provider, i) => {
              console.log(provider);
              if (provider.id !== "email") {
                return (
                  <div key={provider.name} className="">
                    <div className="">
                      <button
                        type="button"
                        className="mb-3 w-full border border-gray-100 bg-gray-100 p-3 font-semibold hover:bg-gray-200"
                        onClick={() => signIn(provider.id)}
                      >
                        <div className="flex items-center justify-center">
                          {provider.name === "Google" ? (
                            <FaGoogle />
                          ) : (
                            <FaDiscord />
                          )}
                          <div className="ml-2">
                            Continue with {provider.name}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              }
            })
          : ""}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
};

SignIn.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default SignIn;
