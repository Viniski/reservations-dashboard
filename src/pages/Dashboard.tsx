import ReservationBoard from "../components/ReservationsDashboard/ReservationBoard";
import { useNavigate } from "react-router-dom";
import { useReservationsQuery } from "../hooks/useReservationsQuery";
import "../styles/styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
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
      ) : reservationsQuery.isError ? (
        <div className="error">Wystąpił błąd podczas ładowania rezerwacji.</div>
      ) : (
        <ReservationBoard reservations={reservationsQuery.data} />
      )}
    </>
  );
};

export default Dashboard;
