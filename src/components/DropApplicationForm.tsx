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
    <div className="">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="why">WHY DO YOU WANT TO JOIN THIS DROP?</label>
        </div>
        <div>
          <textarea
            {...register("why", { required: true })}
            className="h-auto w-full rounded-md border focus:outline-none"
            placeholder="Why you?"
          />
          {errors.why && <p>This field is required</p>}
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default DropApplicationForm;
