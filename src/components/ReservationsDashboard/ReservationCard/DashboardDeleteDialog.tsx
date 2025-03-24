import { Button } from "@mui/material";
import AppDialog from "../../Dialog";

interface DashboardDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DashboardDeleteDialog: React.FC<DashboardDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => (
  <AppDialog.Container open={open}>
    <AppDialog.Title onClose={onClose}>
      Chcesz usunąć zgłoszenie?
    </AppDialog.Title>
    <AppDialog.Description>
      Pamiętaj, że nie będziesz mógł już go nigdy przywrócić.
    </AppDialog.Description>
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
        onClick={onConfirm}
      >
        Potwierdź
      </Button>
    </AppDialog.Actions>
  </AppDialog.Container>
);

export default DashboardDeleteDialog;
