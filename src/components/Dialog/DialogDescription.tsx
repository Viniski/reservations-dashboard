import { ChildrenProps } from "../../types/reservation";
import "./Dialog.css";

const Description:React.FC<ChildrenProps> = ({ children }) => (
  <p className="dialog-description">{children}</p>
);

export default Description;
