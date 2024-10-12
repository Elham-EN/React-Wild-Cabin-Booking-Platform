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
import { createCabin } from "../../services/apiCabins";

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

export default function CreateCabinForm(): React.ReactElement {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCabinFormData>({
    resolver: zodResolver(createCabinFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newCabin: CreateCabinFormData) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data: CreateCabinFormData): void => {
    mutate({ ...data, image: data.image[0] });
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
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}
