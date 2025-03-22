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
    {/* className="mb-8 flex flex-col gap-2" */}
    <AppDialog.Description >
      Pamiętaj, że nie będziesz mół już przywrócić zgłoszenia.
    </AppDialog.Description>
    <AppDialog.Actions>
      {/* <AppButton color="003" variant="outlined" onClick={onConfirm}> */}
     <button onClick={onConfirm}>Potwierdź</button>
    </AppDialog.Actions>
  </AppDialog.Container>
);

export default DashboardDeleteDialog;
