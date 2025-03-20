import { useEffect, useState } from "react";
import ReservationBoard from "../components/ReservationsDashboard/ReservationBoard";
import { mapResponseObjectToReservation } from "../utils/reservationUtils";
import { Reservation } from "../types/reservation";
import reservationsData from "../data/reservations.json";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        const validReservations = reservationsData.map(
          mapResponseObjectToReservation
        );
        setReservations(validReservations);
      } catch (error) {
        console.error("Błąd podczas przetwarzania danych rezerwacji:", error);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, []);

  return (
    <>
      <div className="action-button">
        <button className="btn-action" onClick={() => navigate('/add')}>Dodaj rezerwacje</button>
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
