import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Headers/Heading";
import Row from "../ui/Layouts/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
