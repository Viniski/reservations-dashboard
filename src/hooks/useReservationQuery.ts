import { useQuery } from "@tanstack/react-query";
import supabase from "../api/supabaseClient";

const fetchReservation = async (id: string) => {
  const { data } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  return data;
};

export const useReservationQuery = (id: string) =>
  useQuery({
    queryKey: ["RESERVATIONS", id],
    queryFn: () => fetchReservation(id),
    staleTime: Infinity,
  });
