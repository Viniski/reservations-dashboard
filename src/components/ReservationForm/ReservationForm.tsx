import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { Reservation } from "../../types/reservation";
import { useReservationFormMutation } from "../../hooks/useReservationFormMutation";
import "./ReservationForm.css";

interface ReservationFormProps {
  defaultValue?: Reservation;
  type: "edit" | "create";
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  defaultValue,
  type,
}) => {
  const isTypeCreate = type === "create";
  const reservationFormMutation = useReservationFormMutation(
    isTypeCreate,
    defaultValue
  );
  const form = useForm({
    defaultValues: {
      guestName: defaultValue?.guestName || "",
      checkInDate: defaultValue?.checkInDate || "",
      checkOutDate: defaultValue?.checkOutDate || "",
      roomNumber: defaultValue?.roomNumber || "",
      notes: defaultValue?.notes || "",
      email: defaultValue?.email || "",
    },
  });

  return (
    <form
      className="container-form"
      onSubmit={form.handleSubmit((data) =>
        reservationFormMutation.mutate(data)
      )}
    >
      <Controller
        name="guestName"
        control={form.control}
        rules={{ required: "Imię i nazwisko jest wymagane" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Imię i nazwisko"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      {isTypeCreate && (
        <>
          <Controller
            name="checkInDate"
            control={form.control}
            rules={{
              required: "Data przyjazdu jest wymagana",
              validate: (value) => {
                return new Date(value) <
                  new Date(form.getValues("checkOutDate"))
                  ? true
                  : "Data przyjazdu musi być wcześniejsza niż data wyjazdu";
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Przyjazd"
                type="date"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                slotProps={{
                  htmlInput: { min: new Date().toISOString().split("T")[0] },
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />

          <Controller
            name="checkOutDate"
            control={form.control}
            rules={{
              required: "Data wyjazdu jest wymagana",
              validate: (value) => {
                return new Date(value) > new Date(form.getValues("checkInDate"))
                  ? true
                  : "Data wyjazdu musi być późniejsza niż data przyjazdu";
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Wyjazd"
                type="date"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                slotProps={{
                  htmlInput: { min: new Date().toISOString().split("T")[0] },
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />

          <Controller
            name="roomNumber"
            control={form.control}
            render={({ field }) => (
              <TextField {...field} type="number" label="Numer pokoju" />
            )}
          />
        </>
      )}

      <Controller
        name="notes"
        control={form.control}
        render={({ field }) => (
          <TextField {...field} label="Notatka" multiline rows={4} />
        )}
      />

      <Controller
        name="email"
        control={form.control}
        rules={{
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Nieprawidłowy adres email",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        {isTypeCreate ? "Dodaj rezerwację" : "Zapisz zmiany"}
      </Button>
    </form>
  );
};

export default ReservationForm;
