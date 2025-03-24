import { enqueueSnackbar } from "notistack";
import { Reservation } from "../types/reservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import supabase from "../api/supabaseClient";
import { formatDate } from "../utils/dateFormatters";

const editReservation = async (
  formData: Omit<Reservation, "id" | "status">,
  defaultValue: Reservation | undefined
) => {
  const { data } = await supabase
    .from("reservations")
    .update({ ...formData, status: defaultValue?.status })
    .eq("id", defaultValue?.id);

  return data;
};

const createReservation = async (
  formData: Omit<Reservation, "id" | "status">
) => {
  const status =
    formatDate("today") === formatDate(formData.checkInDate)
      ? "Due In"
      : "Reserved";

  const { data } = await supabase
    .from("reservations")
    .insert([{ ...formData, status }])
    .single();

  return data;
};

export const useReservationFormMutation = (
  isTypeCreate: boolean,
  defaultValue?: Reservation
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: Omit<Reservation, "id" | "status">) =>
      isTypeCreate
        ? createReservation(data)
        : editReservation(data, defaultValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RESERVATIONS"] });
      enqueueSnackbar(
        `Rezerwacja została ${isTypeCreate ? "dodana" : "edytowana"}!`,
        { variant: "success" }
      );
      navigate("/");
    },
    onError: () => {
      enqueueSnackbar(
        `${
          isTypeCreate ? "Dodanie" : "Edytowanie"
        } rezerwacji nie powiodło się.`,
        { variant: "error" }
      );
    },
  });
};
