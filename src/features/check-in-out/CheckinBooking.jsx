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
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [checkValue, setCheckValue] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
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

    if (addBreakfast) {
      checkIn({
        id: bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: settings.breakfastPrice * numGuests * numberNights,
          totalPrice:
            totalPrice + settings.breakfastPrice * numGuests * numberNights,
        },
      });
    } else {
      checkIn({ id: bookingId, breakfast: {} });
    }
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
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((prev) => !prev);
            setCheckValue(false);
          }}
          disabled={hasBreakfast}
          id={"add-breakfast"}
        >
          I want to add breakfast cost{" "}
          {formatCurrency(settings?.breakfastPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          type="checkbox"
          onChange={() => setCheckValue((prev) => !prev)}
          checked={checkValue}
          disabled={checkValue || isUpdating}
          id={"checked-in"}
        >
          I Confimed That <strong>{Guests.fullName}</strong> Has Paid The Total
          Amount for{" "}
          {addBreakfast
            ? formatCurrency(
                totalPrice + settings.breakfastPrice * numberNights * numGuests
              )
            : formatCurrency(totalPrice)}
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
