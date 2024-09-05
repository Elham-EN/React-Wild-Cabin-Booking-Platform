import React from "react";
import Heading from "../ui/Headers/Heading";
import Row from "../ui/Layouts/Row";
import { getCabins } from "../services/apiCabins";
import { Cabin } from "../types/cabin";

interface CabinsListProps {
  cabin: Cabin;
}

function CabinsList({ cabin }: CabinsListProps): React.ReactElement {
  return (
    <li>
      <p>{cabin.name}</p>
      <p>{cabin.description}</p>
      <p>${cabin.regularPrice}</p>
      <img src={cabin.image} alt="" />
    </li>
  );
}

function Cabins(): React.ReactElement {
  const [cabins, setCabins] = React.useState<Cabin[]>();
  React.useEffect(() => {
    function getCabinData() {
      getCabins().then((data) => setCabins(data));
    }
    getCabinData();
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      {cabins &&
        cabins.map((cabin) => (
          <ul key={cabin.name}>
            <CabinsList cabin={cabin} />
          </ul>
        ))}
    </Row>
  );
}

export default Cabins;
