import { ChildrenProps } from "../../types/reservation";
import "./Dialog.css";

const Actions: React.FC<ChildrenProps> = ({ children }) => (
  <div className="dialog-actions">{children}</div>
);

export default Actions;
