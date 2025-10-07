import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import useDeleteBookings from "./useDeleteBookings";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isDeleting, deleteBooking } = useDeleteBookings();
  const { booking, isLoading, bookingId } = useBooking();
  const { checkOut } = useCheckOut();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  const { status, id } = booking;
  console.log(booking);
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              variation="secondary"
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check In
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkOut(bookingId);
              }}
            >
              Check Out
            </Button>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          <Modal.Open opens={"delete"}>
            <Button>
              <HiTrash />
            </Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window opens={"delete"}>
          <ConfirmDelete
            onConfirm={() => {
              deleteBooking(bookingId, {
                onSettled: () => {
                  moveBack();
                },
              });
            }}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
