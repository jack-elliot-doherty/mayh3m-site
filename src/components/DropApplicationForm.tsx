import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";

type DropApplicationFormProps = {
  dropId: string;
};

type FormData = {
  why: string;
};

const DropApplicationForm: React.FC<DropApplicationFormProps> = ({
  dropId,
}) => {
  const { data: session } = useSession();
  const createNewApplication = api.application.createApplication.useMutation();
  const hasApplied = api.user.hasUSerApplied.useQuery(
    { dropId: dropId },
    { enabled: session ? true : false }
  );

  console.log(createNewApplication.isSuccess || hasApplied.data || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createNewApplication.mutate({
      dropId: dropId,
      why: data.why,
    });
  });

  if (hasApplied.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {hasApplied.data || createNewApplication.isSuccess ? (
        <div className="text-center">
          <p className="text-xl font-bold">YOU APPLIED FOR THIS DROP</p>
          <p className="text-xs italic">
            Keep an eye on your email for updates from us about your application
          </p>
          <p className="mt-4 text-xl font-bold">GOOD LUCK</p>
          <p className="text-xs italic">FROM THE MAYH3M TEAM</p>
          <p className=" mb-2 mt-8 text-xs italic">
            Check out our other upcoming drops
          </p>
          <Link className=" bg-black p-2 text-sm font-bold text-white" href="/">
            UPCOMING DROPS
          </Link>
        </div>
      ) : (
        <div className="w-3/4 text-center sm:w-1/2">
          <form onSubmit={onSubmit}>
            <div className="">
              <p className="text-lg font-bold">JOIN THE DROP</p>
              <p className="my-2 text-xs italic">
                Apply below for a chance to be involved in the drop.
              </p>
              <p className="mb-4 text-xs italic">
                100 units will be released, only those who apply and are
                accepted will get to the chance to purchase.
              </p>
              <label className="text-xs font-bold" htmlFor="why">
                WHY DO YOU WANT TO JOIN THIS DROP?
              </label>
            </div>
            <div>
              <textarea
                required
                {...register("why", {
                  required: true,
                  maxLength: 1000,
                  minLength: 10,
                })}
                className="mt-2 h-40 w-full border p-2 focus:outline-none"
                placeholder="why..."
              />

              {createNewApplication.isLoading ? (
                // show loading spinner in centre of button
                <svg
                  className=" h-5 w-5 animate-spin text-white"
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
              ) : (
                <button
                  className="w-full bg-black p-2 text-center text-xs text-white hover:opacity-50"
                  type="submit"
                >
                  SUBMIT
                </button>
              )}
              {errors.why && (
                <p className="mt-2 text-xs  italic text-red-500">
                  Please enter a valid reason (10-1000 characters).
                </p>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default DropApplicationForm;
