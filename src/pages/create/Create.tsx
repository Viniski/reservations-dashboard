import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="action-button">
      <button className="btn-action" onClick={() => navigate("/")}>
        Wróć do strony głównej
      </button>
    </div>
  );
};

export default Create;
