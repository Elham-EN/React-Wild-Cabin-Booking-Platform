import { ChangeEvent, FormEvent, useState } from "react";
import { useGetUser } from "./useGetUser";
import Button from "../../ui/Button/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ButtonGroup from "../../ui/ButtonGroup";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm(): React.ReactElement {
  // We don't need the loading state, and can immediately use the user data,
  // because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullname: currentFullName },
    },
  } = useGetUser();

  const [fullName, setFullName] = useState<string>(currentFullName);

  const [avatar, setAvatar] = useState<File | null>(null);

  const { isUpdating, updateUserMutate } = useUpdateUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;
    const form = e.target as HTMLFormElement;
    updateUserMutate(
      { avatar, fullname: fullName },
      {
        onSuccess: () => {
          setAvatar(null);
          form.reset();
        },
      }
    );
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled={isUpdating} readOnly id="email" />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" onChange={handleFileUpload} />
      </FormRow>
      <ButtonGroup>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          Update account
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default UpdateUserDataForm;
