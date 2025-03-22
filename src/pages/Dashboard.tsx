import { useEffect, useState } from "react";
import ReservationBoard from "../components/ReservationsDashboard/ReservationBoard";
import { mapResponseObjectToReservation } from "../utils/reservationUtils";
import { Reservation } from "../types/reservation";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import supabase from "../api/supabase-client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')  
    if (error) {
      console.error("Error fetching: ", error);
    } else {
      const validReservations = data.map(mapResponseObjectToReservation);
      setReservations(validReservations);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <>
      <div className="action-button">
        <button className="btn-action" onClick={() => navigate("/add")}>
          Dodaj rezerwacje
        </button>
      </div>
      {loading ? (
        <div className="loading">Ładowanie danych rezerwacji...</div>
      ) : (
        <ReservationBoard reservations={reservations} />
      )}
    </>
  );
};

export default Dashboard;
