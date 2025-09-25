import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import useDeleteCabins from "./useDeleteCabins";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabins";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showEdit, setShowEdit] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabins();
  const { isCreated, createCabin } = useCreateCabin();
  function handelCopy() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handelCopy} disabled={isCreated}>
            <span>
              <HiSquare2Stack />
            </span>
          </button>
          <Modal>
            <Modal.Open opens={"edit-form"}>
              <button
                onClick={() => {
                  setShowEdit((prev) => !prev);
                }}
              >
                <span>
                  <HiPencil />
                </span>
              </button>
            </Modal.Open>
            <Modal.Window opens={"edit-form"}>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open>
              <button>
                <span>
                  <HiTrash />
                </span>
              </button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button>Delete</Menus.Button>
              <Menus.Button>Dublicate</Menus.Button>
              <Menus.Button>Edit</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
