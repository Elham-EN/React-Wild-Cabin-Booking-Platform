import React from "react";
import Heading from "../ui/Headers/Heading";
import Row from "../ui/Layouts/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins(): React.ReactElement {
  const [showForm, setShowForm] = React.useState<boolean>(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>Add new cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
