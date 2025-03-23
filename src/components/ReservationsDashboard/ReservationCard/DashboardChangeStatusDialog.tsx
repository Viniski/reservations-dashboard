import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AppDialog from "../../Dialog";
import { Reservation, ReservationStatus } from "../../../types/reservation";
import { Controller, useForm } from "react-hook-form";

type StatusType = string | undefined;

const getPossibleStatusesToChange = (status: ReservationStatus) => {
  if (status === "Reserved") {
    return ["Cancelled", "Due In"] as const;
  }

  if (status === "Due In") {
    return ["Cancelled", "No Show", "In House"] as const;
  }

  if (status === "In House") {
    return ["Checked Out"] as const;
  }

  if (status === "Checked Out") {
    return ["In House"] as const;
  }

  if (status === "Canceled") {
    return ["Reserved"] as const;
  }
};

const DashboardChangeStatusDialog = ({
  open,
  reservation,
  onClose,
  onConfirm,
}: {
  open: boolean;
  reservation: Reservation;
  onClose: () => void;
  onConfirm: (status: ReservationStatus) => void;
}) => {
  const possibleStatuses =
    getPossibleStatusesToChange(reservation.status) || [];

  const statusForm = useForm<{ status: StatusType }>({
    defaultValues: {
      status: possibleStatuses[0],
    },
  });

  return (
    <AppDialog.Container open={open}>
      <AppDialog.Title onClose={onClose}>
        Zmień status rezrwacji
      </AppDialog.Title>
      <AppDialog.Description>
        Zmień status rezerwacji z {reservation.status} na:
      </AppDialog.Description>
      <Controller
        control={statusForm.control}
        name="status"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onChange={(event) =>
              statusForm.setValue("status", event.target.value)
            }
          >
            {possibleStatuses.map((answer) => (
              <FormControlLabel
                key={answer}
                label={answer}
                value={answer}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        )}
      />
      <AppDialog.Actions>
        <button onClick={onClose}>Anuluj</button>
        <button
          disabled={!statusForm.getValues("status")}
          onClick={() =>
            onConfirm(statusForm.getValues("status") as ReservationStatus)
          }
        >
          Potwierdź
        </button>
      </AppDialog.Actions>
    </AppDialog.Container>
  );
};

export default DashboardChangeStatusDialog;
