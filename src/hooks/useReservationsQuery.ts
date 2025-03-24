import { useQuery } from "@tanstack/react-query";
import supabase from "../api/supabaseClient";
import { mapResponseObjectToReservation } from "../utils/reservationUtils";

const fetchReservations = async () => {
  const { data } = await supabase.from("reservations").select("*");
  const validReservations = data?.map(mapResponseObjectToReservation);

  return validReservations;
};

export const useReservationsQuery = () =>
  useQuery({
    queryKey: ["RESERVATIONS"],
    queryFn: fetchReservations,
    staleTime: Infinity,
  });
