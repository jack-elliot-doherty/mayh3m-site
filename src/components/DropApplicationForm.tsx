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
    { enabled: session ? true : false, cacheTime: 0 }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    createNewApplication.mutate({
      dropId: dropId,
      why: data.why,
    });
  });

  if (hasApplied.isLoading) {
    return (
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
    );
  }

  if (hasApplied.data || createNewApplication.isSuccess) {
    return (
      <div className="">
        <p className="text-lg font-bold">YOU APPLIED FOR THIS DROP</p>
        <p className="mb-10 text-xs italic">
          Keep an eye on your email for updates from us about your application
        </p>
        <Link className=" bg-black p-2 text-sm font-bold text-white" href="/">
          UPCOMING DROPS
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="w-3/4 text-center ">
        <form onSubmit={onSubmit}>
          <div className="">
            <p className="text-lg font-bold">JOIN THE DROP</p>
            <p className="my-2 text-xs italic">
              Apply below for a chance to be involved in the drop.
            </p>

            <label className="text-xs font-bold" htmlFor="why">
              WHY DO YOU WANT TO JOIN THIS DROP?
            </label>
          </div>
          <div className="mx-auto lg:w-3/4">
            <textarea
              required
              {...register("why", {
                required: true,
                maxLength: 1000,
                minLength: 10,
              })}
              className="mx-auto h-40 w-full border p-2 focus:outline-none"
              placeholder="why..."
            />

            {createNewApplication.isLoading ? (
              // show loading spinner in centre of button
              <div className="w-full bg-black p-2 text-center text-xs text-white ">
                <svg
                  className="mx-auto h-4 w-4 animate-spin text-white"
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
              </div>
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
    </>
  );
};

export default DropApplicationForm;
