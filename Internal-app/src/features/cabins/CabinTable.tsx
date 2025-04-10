import React from "react";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { Cabin } from "../../types/cabin";

export default function CabinTable(): React.ReactElement {
  const { isPending, cabins } = useGetCabins();
  // To read the data from the URL
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";
  let filteredCabins: Cabin[] | undefined;

  // FILTER OPERATIONS
  if (filteredValue === "all") {
    filteredCabins = cabins;
  }

  if (filteredValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }

  if (filteredValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  // SORTING OPERATIONS
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    // For numeric properties
    if (
      typeof a[field as keyof Cabin] === "number" &&
      typeof b[field as keyof Cabin] === "number"
    ) {
      return (
        modifier *
        ((a[field as keyof Cabin] as number) - (b[field as keyof Cabin] as number))
      );
    }

    // For string properties
    if (
      typeof a[field as keyof Cabin] === "string" &&
      typeof b[field as keyof Cabin] === "string"
    ) {
      return (
        modifier *
        (a[field as keyof Cabin] as string).localeCompare(
          b[field as keyof Cabin] as string
        )
      );
    }

    return 0;
  });

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
