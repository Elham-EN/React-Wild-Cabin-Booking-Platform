import { ReactElement } from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations(): ReactElement {
  return (
    <TableOperations>
      <Filter />
    </TableOperations>
  );
}

export default CabinTableOperations;
