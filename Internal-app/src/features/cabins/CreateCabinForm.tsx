import React from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { createCabin, editCabin } from "../../services/apiCabins";
import { Cabin as CabinType } from "../../types/cabin";
import { z } from "zod";

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
}

function CreateCabinForm({ cabin }: Props): React.ReactElement {
  const isEditSession = Boolean(cabin?.id);
  const editValues = cabin ?? {};

  const queryClient = useQueryClient();

  // where the user doesn't change the image when editing. Update your
  // form schema to make the image field optional during editing:
  const createCabinFormSchemaWithOptionalImage = isEditSession
    ? createCabinFormSchema.extend({
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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateCabinFormData) => {
      if (isEditSession && cabin?.id) {
        return editCabin(cabin.id, data);
      } else {
        return createCabin(data);
      }
    },
    onSuccess: (updatedData) => {
      toast.success(
        isEditSession ? "Cabin successfully updated" : "New cabin successfully created"
      );

      // Invalidate the query to refresh the cabins list
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      if (isEditSession) {
        // If it's an edit, reset the form with the updated values
        reset(updatedData);
      } else {
        // If it's a new cabin, just clear the form
        reset();
      }
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data: CreateCabinFormData): void => {
    // For a new cabin, pass the image file directly
    // For editing, only pass the new image file if it's been changed
    const imageValue = data.image instanceof FileList ? data.image[0] : data.image;
    mutate({ ...data, image: imageValue });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
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
