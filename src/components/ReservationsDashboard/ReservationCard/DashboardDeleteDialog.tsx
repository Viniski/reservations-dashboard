import AppDialog from "../../Dialog";

const DashboardDeleteDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <AppDialog.Container open={open}>
    <AppDialog.Title onClose={onClose}>
      Czy jesteś pewny, że chcesz usunąć zgłoszenie?
    </AppDialog.Title>
    <AppDialog.Description>
      Pamiętaj, że nie będziesz mógł już przywrócić zgłoszenia.
    </AppDialog.Description>
    <AppDialog.Actions>
      <button onClick={onClose}>Anuluj</button>
      <button onClick={onConfirm}>Potwierdź</button>
    </AppDialog.Actions>
  </AppDialog.Container>
);

export default DashboardDeleteDialog;
