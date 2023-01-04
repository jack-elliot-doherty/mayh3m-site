import { type NextPage } from "next";
import Head from "next/head";
import { ReactElement, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../components/layout";

import { api } from "../utils/api";
import { NextPageWithLayout } from "./_app";

type Inputs = {
  name: string;
  email: string;
  why: string;
};

const Home: NextPageWithLayout = () => {
  const newApplicant = api.applicant.createApplicant.useMutation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const token = recaptchaRef.current?.getValue();
    recaptchaRef.current?.reset();
    if (!token) {
      alert("Please verify that you are a human!");
      return;
    }
    newApplicant.mutate({ ...data, token: token });
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center font-semibold">
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
            {newApplicant.isSuccess ? (
              <div>
                <h1 className="text-2xl">You&apos;re nearly in.</h1>
                <br></br>
                <p>We sent an email to </p>
                {/* <br></br> */}
                <p className="text-xl text-red-600">
                  {getValues("email")}
                </p>
                <br></br>
                <p>
                  Please check your email and click the link to verify your
                  account.
                </p>

                <p className="text-sm font-normal">If you don&apos;t see it, you may need to <span>check your spam</span>folder</p>
              </div>
            ) : (
              <>
                <h3>Apply today for our first drop and be 1 of 100.</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2">
                    <div className="text-left">
                      <label htmlFor="name" className="text-base font-medium">
                        Name
                      </label>
                    </div>
                    <div className="relative mt-1 shadow-sm">
                      <input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: true,
                          maxLength: 50,
                          minLength: 3,
                        })}
                        className="w-full border py-1.5 pl-1 pr-12 font-light sm:text-sm"
                        placeholder="Name"
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                    </div>
                    {errors.name && (
                      <>
                        <p
                          className="mt-2 text-left text-sm text-red-600"
                          id="name-error"
                        >
                          Please enter a valid name
                        </p>
                        <p className="mt-2 text-left text-xs text-red-600">
                          (3-50 Characters, No special Characters).
                        </p>
                      </>
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="text-left">
                      <label htmlFor="email" className="text-base font-medium">
                        Email
                      </label>
                    </div>
                    <div className="mt-1 shadow-sm">
                      <input
                        type="text"
                        id="email"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        className="w-full border py-1.5 pl-1 pr-12 font-light sm:text-sm"
                        placeholder="example@gmail.com"
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                    </div>
                    {errors.email && (
                      <p
                        className="mt-2 text-left text-sm text-red-600"
                        id="email-error"
                      >
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="text-left">
                      <label
                        htmlFor="why"
                        className="block text-base font-medium"
                      >
                        Why you?{" "}
                        <span className="text-xs">(20-300 Characters)</span>
                      </label>
                    </div>
                    <div className="relative mt-1">
                      <textarea
                        id="why"
                        rows={5}
                        {...register("why", {
                          required: true,
                          maxLength: 300,
                          minLength: 20,
                        })}
                        className="w-full border pl-1 pr-12 pt-1 font-light sm:text-sm"
                        placeholder="why you?"
                        aria-invalid={errors.why ? "true" : "false"}
                      />
                    </div>
                    {errors.why && (
                      <p
                        className="mt-2 text-left text-sm text-red-600"
                        id="why-error"
                      >
                        Please enter a reason (min 20 Characters).
                      </p>
                    )}
                  </div>
                  <div className="mt-1">
                    <div>
                      <ReCAPTCHA
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                        }
                        size="normal"
                        ref={recaptchaRef}
                      />
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        {newApplicant.isLoading ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                              ></path>
                            </svg>
                            <span className="text-white">Loading...</span>
                          </div>
                        ) : (
                          "Apply"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
            {newApplicant.isError && (
              <p className="text-red-600">
                There was an error submitting your application. Please try
                again.
              </p>
            )}
          </div>
          <div className="flex justify-end p-6">
            <div className="p-1">
              <a
                href="https://www.instagram.com/mayh3m.xyz/"
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
                <img className="h-auto w-5" src="/static/img/twitter.png"></img>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
