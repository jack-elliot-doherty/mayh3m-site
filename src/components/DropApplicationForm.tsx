import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

type DropApplicationFormProps = {
  dropId: string;
  userId: string;
};

type FormData = {
  why: string;
};

const DropApplicationForm: React.FC<DropApplicationFormProps> = ({
  dropId,
  userId,
}) => {
  const { data: session } = useSession();
  const createNewApplication = api.application.createApplication.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // createNewApplication.mutate({
    //   userId: userId,
    //   dropId: dropId,
    //   why: data.why,
    // });
  });

  return (
    <div className="w-3/4 text-center sm:w-1/2">
      <form onSubmit={onSubmit}>
        <div className="">
          <label className="text-xs font-bold" htmlFor="why">
            WHY DO YOU WANT TO JOIN THIS DROP?
          </label>
        </div>
        <div>
          <textarea
            required
            {...register("why", { required: true })}
            className="h-40 w-full border p-2 focus:outline-none"
            placeholder="tesdt"
          />
          {/* {errors.why && <p className="text-red-400">This field is required</p>} */}
          <button
            className="w-full bg-black p-2 text-xs text-white hover:opacity-50"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default DropApplicationForm;
