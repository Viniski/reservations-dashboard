import ReservationBoard from "../../components/ReservationsDashboard/ReservationBoard";
import { mapResponseObjectToReservation } from "../../utils/reservationUtils";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import supabase from "../../api/supabase-client";
import { useQuery } from "@tanstack/react-query";
import QueryKey from "../../enums/query-key";

const Dashboard = () => {
  const navigate = useNavigate();

  const fetchReservations = async () => {
    const { data } = await supabase.from("reservations").select("*");
    const validReservations = data?.map(mapResponseObjectToReservation);
      
    return validReservations
    }

  const useReservationsQuery = () =>
    useQuery({
      queryKey: [QueryKey.RESERVATIONS],
      queryFn: fetchReservations,
      staleTime: Infinity,
    });

   const reservationsQuery = useReservationsQuery();  

  return (
    <>
      <div className="action-button">
        <button className="btn-action" onClick={() => navigate("/add")}>
          Dodaj rezerwacje
        </button>
      </div>
      {reservationsQuery.isLoading ? (
        <div className="loading">Ładowanie danych rezerwacji...</div>
      ) : (
        <ReservationBoard reservations={reservationsQuery.data} />
      )}
    </>
  );
};

export default Dashboard;
