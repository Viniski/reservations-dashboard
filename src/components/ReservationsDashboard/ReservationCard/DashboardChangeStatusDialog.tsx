import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AppDialog from "../../Dialog";
import { Reservation, ReservationStatus } from "../../../types/reservation";
import { Controller, useForm } from "react-hook-form";
import { getPossibleStatusesToChange } from "../../../utils/reservationUtils";

interface DashboardChangeStatusDialogProps {
  open: boolean;
  reservation: Reservation;
  onClose: () => void;
  onConfirm: (status: ReservationStatus) => void;
}

const DashboardChangeStatusDialog: React.FC<DashboardChangeStatusDialogProps> = ({
  open,
  reservation,
  onClose,
  onConfirm,
}) => {
  const possibleStatuses = getPossibleStatusesToChange(reservation.status);

  const statusForm = useForm<{ status: ReservationStatus }>({
    defaultValues: {
      status: possibleStatuses?.[0],
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
              statusForm.setValue("status", event.target.value as ReservationStatus)
            }
          >
            {(possibleStatuses || []).map((answer) => (
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
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Anuluj
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() =>
            onConfirm(statusForm.getValues("status") as ReservationStatus)
          }
        >
          Potwierdź
        </Button>
      </AppDialog.Actions>
    </AppDialog.Container>
  );
};

export default DashboardChangeStatusDialog;
