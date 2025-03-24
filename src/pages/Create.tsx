import { useNavigate } from "react-router-dom";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import "../styles/styles.css";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="container-column">
      <button className="btn-action" onClick={() => navigate("/")}>
        Wróć do strony głównej
      </button>
      <ReservationForm type="create" />
    </div>
  );
};

export default Create;
