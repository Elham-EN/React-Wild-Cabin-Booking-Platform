import React from "react";
import styled from "styled-components";
import { Cabin as CabinType } from "../../types/cabin";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button/Button";
import Row from "../../ui/Layouts/Row";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// export const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    description,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabinMutate } = useDeleteCabin();

  const { isPending, mutateDuplicateCabin } = useDuplicateCabin(
    {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    },
    cabinId
  );

  const handleDuplicate = () => {
    mutateDuplicateCabin();
  };

  const handleDeleteCabin = (id: string): void => {
    deleteCabinMutate(id);
  };

  if (isPending) return <Spinner />;

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>-</span>}
      <Row type="horizontal">
        <Button onClick={handleDuplicate}>{<HiSquare2Stack />}</Button>

        <Modal>
          <Modal.Open opens="edit">
            <Button>
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete">
            <Button>
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={"cabins"}
              disabled={isDeleting}
              onConfirm={() => handleDeleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </Row>
    </Table.Row>
  );
}
