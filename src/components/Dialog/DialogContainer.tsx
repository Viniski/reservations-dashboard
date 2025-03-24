import { Dialog, DialogProps } from "@mui/material";
import "./Dialog.css";

const Container: React.FC<DialogProps> = (props) => (
  <Dialog classes={{ paper: "dialog-container" }} {...props} />
);

export default Container;
