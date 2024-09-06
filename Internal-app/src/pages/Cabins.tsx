import React from "react";
import Heading from "../ui/Headers/Heading";
import Row from "../ui/Layouts/Row";
import CabinTable from "../features/cabins/CabinTable";

function Cabins(): React.ReactElement {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
