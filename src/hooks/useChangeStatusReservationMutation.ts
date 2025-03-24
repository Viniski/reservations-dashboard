import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import supabase from "../api/supabaseClient";

export const useChangeStatusReservationMutation = (
  reservationId: string,
  onToggle: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string) => {
      const { data } = await supabase
        .from("reservations")
        .update({ status })
        .eq("id", reservationId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RESERVATIONS"] });
      enqueueSnackbar("Status rezerwacji został zmieniony pomyślnie!", {
        variant: "success",
      });
      onToggle();
    },
    onError: () => {
      enqueueSnackbar("Zmiana statusu rezerwacji nie powiodła się.", {
        variant: "error",
      });
    },
  });
};
