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
    <>
      <section className="">
        <div className="text-center">
          <h1 className="text-2xl">Congratulations</h1>
          <h2 className="text-3xl">
            Welcome to Mayh<span className="text-red-600">3</span>m Clothing
          </h2>
          <p className="text-xl">
            By F<span className="text-red-600">3</span>Z
          </p>
        </div>
        <h1>SignIn to Continue</h1>

        <div className="">
          <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input type="email" id="email" name="email" placeholder="Email" />
            <button className="" type="submit">
              Sign in with Email
            </button>
          </form>
          <h1>OR</h1>

          <div className="">
            {providers
              ? Object.values(providers).map((provider, i) => {
                  if (provider.id !== "email") {
                    return (
                      <div key={provider.name} className="">
                        <div className="">
                          <button onClick={() => signIn(provider.id)}>
                            {provider.name}
                          </button>
                        </div>
                      </div>
                    );
                  }
                })
              : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
};

SignIn.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SignIn;
