import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Cabin as CabinType } from "../../types/cabin";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 5px;
`;

export const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

export const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface Props {
  cabin: CabinType;
}

export default function CabinRow({ cabin }: Props): React.ReactElement {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin;

  // Access Query Client
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id: string) => deleteCabin(id),
    // Tell react query what to do after, as soons as the mutation was a success
    // Need to refetch data, by invaliding the cache.
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      // After performing a mutation, invalidating relevant queries allows the
      // UI to reflect these changes immediately.
      queryClient.invalidateQueries({
        // which exact query / data to be invalidated
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleDeleteCabin = (id: string) => {
    mutate(id);
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => handleDeleteCabin(cabinId)} disabled={isDeleting}>
        Delete
      </button>
    </TableRow>
  );
}
