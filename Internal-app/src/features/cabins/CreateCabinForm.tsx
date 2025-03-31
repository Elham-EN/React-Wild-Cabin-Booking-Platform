import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCabinFormData,
  createCabinFormSchema,
} from "../../schemas/createCabinFormSchema";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { Cabin as CabinType } from "../../types/cabin";
import { z } from "zod";
import { useMutateCabin } from "./useMutateCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

export const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
interface Props {
  cabin?: CabinType;
  // This Create Form might be use in other place but not in modal.
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabin, onCloseModal }: Props): React.ReactElement {
  // If it contain cabin.id, because the id is generated by supabase
  // and we know that the cabin data comes from the database
  const isEditSession = Boolean(cabin?.id);
  /**
 * If cabin exists (is not null or undefined), editValues will 
   be set to the value of cabin
 * If cabin is null or undefined, editValues will be set to an 
   empty object {}
 */
  const editValues = cabin ?? {};

  // where the user doesn't change the image when editing. Update your
  // form schema to make the image field optional during editing:
  const createCabinFormSchemaWithOptionalImage = isEditSession
    ? // extends the validation schema during edit sessions:
      createCabinFormSchema.extend({
        image: z.any().optional(),
      })
    : createCabinFormSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCabinFormData>({
    defaultValues: isEditSession ? editValues : {},
    resolver: zodResolver(createCabinFormSchemaWithOptionalImage),
  });

  const { isPending, mutateCabin } = useMutateCabin(
    isEditSession,
    cabin?.id,
    reset,
    onCloseModal
  );

  const onSubmit = (data: CreateCabinFormData): void => {
    // For a new cabin, pass the image file directly
    // For editing, only pass the new image file if it's been changed
    const imageValue = data.image instanceof FileList ? data.image[0] : data.image;
    mutateCabin({ ...data, image: imageValue });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" width="350px" {...register("name")} />
      </FormRow>
      {errors?.name?.message && <Error>{errors.name.message}</Error>}

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>
      {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>
      {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("discount")} />
      </FormRow>
      {errors?.discount?.message && <Error>{errors.discount.message}</Error>}

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          width="350px"
          {...register("description")}
        />
      </FormRow>
      {errors?.description?.message && <Error>{errors.description.message}</Error>}

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>
      {errors?.image?.message && <Error>{String(errors.image.message)}</Error>}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
