import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../api/supabaseClient";
import { enqueueSnackbar } from "notistack";

export const useDeleteReservationMutation = (
  reservationId: string,
  onToggle: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await supabase.from("reservations").delete().eq("id", reservationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RESERVATIONS"] });
      enqueueSnackbar("Rezerwacja została usunięta!", { variant: "success" });
      onToggle();
    },
    onError: () => {
      enqueueSnackbar("Usunięcie rezerwacji nie powiodło się.", {
        variant: "error",
      });
    },
  });
};
