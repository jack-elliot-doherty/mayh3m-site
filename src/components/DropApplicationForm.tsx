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
    <div className="w-full text-center">
      <form onSubmit={onSubmit}>
        <div className="w-full ">
          <label className="text-xs font-bold" htmlFor="why">
            WHY DO YOU WANT TO JOIN THIS DROP?
          </label>
        </div>
        <div>
          <textarea
            {...register("why", { required: true })}
            className="h-40 w-1/2 border p-2 focus:outline-none"
            placeholder="tesdt"
          />
          {errors.why && <p>This field is required</p>}
        </div>
        <div>
          <button className="hover:opacity-50" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default DropApplicationForm;
