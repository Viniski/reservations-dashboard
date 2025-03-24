import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import { useReservationQuery } from "../hooks/useReservationQuery";
import "../styles/styles.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const reservationQuery = useReservationQuery(id);

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
