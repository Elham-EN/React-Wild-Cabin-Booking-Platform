import { ChangeEvent } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useFetchSettings } from "./useFetchSettings";
import { useUpdateSettings } from "./useUpdateSetting";
import { EditCabinSetting } from "../../types/Setting";

function UpdateSettingsForm() {
  const { isLoading, settings } = useFetchSettings();

  const { isUpdating, mutateUpdateSetting } = useUpdateSettings();

  if (isLoading) {
    return <Spinner />;
  }

  type SettingField = keyof EditCabinSetting;

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>, field: SettingField) => {
    const { value } = event.target;
    if (!value) return;
    mutateUpdateSetting({ [field]: value } as EditCabinSetting);
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength}
          onBlur={(event) => handleUpdate(event, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.maxBookingLength}
          onBlur={(event) => handleUpdate(event, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={(event) => handleUpdate(event, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice}
          onBlur={(event) => handleUpdate(event, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
