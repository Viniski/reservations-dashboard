import { ChildrenProps } from "../../types/reservation";
import './Dialog.css';

const Actions = ({ children }: ChildrenProps) => (
  <div className={'dialog-actions'}>{children}</div>
);

export default Actions;
