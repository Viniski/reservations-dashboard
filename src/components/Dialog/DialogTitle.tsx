import { ChildrenProps } from "../../types/reservation";
import "./Dialog.css";

interface AppDialogTitleProps extends ChildrenProps {
  onClose?: () => void;
}

const Title: React.FC<AppDialogTitleProps> = ({ children, onClose }) => (
  <h2 className="dialog-header">
    {children}
    {onClose && (
      <button
        aria-label="close"
        className="dialog-close-button btn-action-card"
        onClick={onClose}
      >
        X
      </button>
    )}
  </h2>
);

export default Title;
