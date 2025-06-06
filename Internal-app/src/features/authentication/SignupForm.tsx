import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm(): React.ReactElement {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<SignUpFormData>();

  const { signupMutate, isPending } = useSignup();

  const onSubmit = (data: SignUpFormData) => {
    signupMutate(
      { fullname: data.fullName, email: data.email, password: data.password },
      { onSettled: () => reset() }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide valid email address",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimun of 8 characters",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          disabled={isPending}
        />
      </FormRow>

      <ButtonGroup>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </ButtonGroup>
    </Form>
  );
}

export default SignupForm;
