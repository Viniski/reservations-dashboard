import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import { useQuery } from "@tanstack/react-query";
import QueryKey from "../../enums/query-key";
import supabase from "../../api/supabase-client";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const fetchReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", id)
      .single();

    return data;
  };

  const useReservationQuery = () =>
    useQuery({
      queryKey: [QueryKey.RESERVATIONS, id],
      queryFn: fetchReservations,
      staleTime: Infinity,
    });

  const reservationQuery = useReservationQuery();

  return (
    <div className="container-column">
        <button className="btn-action" onClick={() => navigate("/")}>
        Wróć do strony głównej
      </button>
      {reservationQuery.isLoading ? (
        <div className="loading">Ładowanie danych rezerwacji...</div>
      ) : (
        <ReservationForm type="edit" defaultValue={reservationQuery.data} />
      )}
    </div>
  );
};

export default Edit;
