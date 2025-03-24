import { useNavigate } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm/ReservationForm";

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
