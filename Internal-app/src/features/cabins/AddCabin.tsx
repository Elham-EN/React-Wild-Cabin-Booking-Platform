import { JSX } from "react";
import Button from "../../ui/Button/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin(): JSX.Element {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// export default function AddCabin(): JSX.Element {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
