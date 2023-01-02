import { type NextPage } from "next";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "../utils/api";

type Inputs = {
  name: string;
  email: string;
  why: string;
};

const Home: NextPage = () => {
  const newApplicant = api.applicant.createApplicant.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    newApplicant.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Mayh3m</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <main className="flex min-h-full items-center justify-center font-semibold">
        <div className="container flex flex-col items-center justify-center gap-16 px-4 py-16 ">
          <img
            alt="Mayh3m logo"
            title="Mayh3m logo"
            src="/static/img/logo.png"
          ></img>
          <div className="text-center">
            <h1 className="text-2xl">Congratulations</h1>
            <h2 className="text-3xl">
              Welcome to Mayh<span className="text-red-600">3</span>m Clothing
            </h2>
            <p className="text-xl">
              By F<span className="text-red-600">3</span>Z
            </p>
          </div>
          <div className="text-center text-lg">
            <h3>Apply today for our first drop and be 1 of 100.</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2">
                <div className="text-left">
                  <label htmlFor="name" className="text-base font-medium">
                    Name
                  </label>
                </div>
                <div className="relative mt-1 border shadow-sm">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full py-1 pr-12 font-light sm:text-sm"
                    placeholder=" Name"
                  />
                </div>
              </div>

              <div className="mt-2">
                <div className="text-left">
                  <label htmlFor="email" className="text-base font-medium">
                    Email
                  </label>
                </div>
                <div className="mt-1 border shadow-sm">
                  <input
                    type="text"
                    id="email"
                    {...register("email")}
                    className="w-full py-2 pr-12 font-light sm:text-sm"
                    placeholder=" example@gmail.com"
                  />
                </div>
              </div>

              <div className="mt-2">
                <div className="text-left">
                  <label htmlFor="why" className="block text-base font-medium">
                    Why you?
                  </label>
                </div>
                <div className="relative mt-1 border shadow-sm">
                  <textarea
                    id="why"
                    rows={5}
                    {...register("why")}
                    className="w-full pr-12 pt-1 font-light sm:text-sm"
                    placeholder=" why you?"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-end p-6">
            <div className="p-1">
              <a
                href="https://www.instagram.com/mayhemclothing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-auto w-5"
                  src="/static/img/instagram.png"
                ></img>
              </a>
            </div>
            <div className="p-1">
              <a
                href="https://www.facebook.com/mayhemclothing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-auto w-5"
                  src="/static/img/facebook.png"
                ></img>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
