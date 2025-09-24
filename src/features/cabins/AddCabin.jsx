import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens={"cabin-form"}>
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window opens={"cabin-form"}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens={"cabin-table"}>
          <Button>show Cabin Table</Button>
        </Modal.Open>
        <Modal.Window opens={"cabin-table"}>
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCabin;
