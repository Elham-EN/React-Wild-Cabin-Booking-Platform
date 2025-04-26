import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../../ui/Button/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ButtonGroup from "../../ui/ButtonGroup";
import { ReactElement } from "react";

interface UpdatePassword {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm(): ReactElement {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<UpdatePassword>();
  const { errors } = formState;

  const { updateUserMutate, isUpdating } = useUpdateUser();

  function onSubmit({ password }: UpdatePassword) {
    updateUserMutate({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <ButtonGroup>
        <Button onClick={() => reset()} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </ButtonGroup>
    </Form>
  );
}

export default UpdatePasswordForm;
