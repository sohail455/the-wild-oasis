import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckIn from "./useCheckIn";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [checkValue, setCheckValue] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();

  const { checkIn, isUpdating } = useCheckIn();

  useEffect(
    function () {
      setCheckValue(booking?.isPaid || false);
    },
    [booking?.isPaid]
  );

  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    Guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numberNights,
  } = booking;

  function handleCheckin() {
    if (!checkValue) return;

    checkIn(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          type="checkbox"
          onChange={() => setCheckValue((prev) => !prev)}
          checked={checkValue}
          disabled={checkValue || isUpdating}
          id={"checked-in"}
        >
          I Confimed That <strong>{Guests.fullName}</strong> Has Paid The Total
          Amount
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!checkValue || isUpdating}>
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
