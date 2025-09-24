import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useCreateCabins from "./useCreateCabins";
import useEditCabin from "./useEditCabin";
import { useForm } from "react-hook-form";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCancelClick }) {
  const { id: EditId, ...editValues } = cabinToEdit;
  const isEdditSession = Boolean(EditId);
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEdditSession ? editValues : {},
  });

  const { isCreated, createCabin } = useCreateCabins();
  const { isEdited, editCabin } = useEditCabin();
  const isWorking = isEdited || isCreated;

  const { errors } = formState;
  console.log(errors.maxCapacity);

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log(image);
    if (isEdditSession)
      editCabin(
        { newCabin: { ...data, image: image }, EditId },
        {
          onSuccess: () => {
            reset();
            onCancelClick?.(false);
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCancelClick?.(false);
          },
        }
      );
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", { required: "this field is requirde" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is requirde",
            min: { value: 1, message: "should be one or more" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "this field is requirde" })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is requirde",
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be equal or less than the price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "this field is requirde " })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEdditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCancelClick?.(false)}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEdditSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
