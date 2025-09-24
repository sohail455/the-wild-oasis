import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";
function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookinglen,
      maxBookingLen,
      maxGuestPerBookinng,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdated, updateSetting } = useUpdateSetting();
  function handelUpdate(e, setting) {
    const value = e.target.value;
    if (!value) return;
    updateSetting({ [setting]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookinglen}
          onBlur={(e) => handelUpdate(e, "minBookinglen")}
          disabled={isUpdated}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLen}
          onBlur={(e) => handelUpdate(e, "maxBookingLen")}
          disabled={isUpdated}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBookinng}
          onBlur={(e) => handelUpdate(e, "maxGuestPerBookinng")}
          disabled={isUpdated}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handelUpdate(e, "breakfastPrice")}
          disabled={isUpdated}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
