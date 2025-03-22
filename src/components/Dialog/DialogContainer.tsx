import { Dialog, DialogProps } from '@mui/material';
import './Dialog.css';

const Container = (props: DialogProps) => (
  <Dialog
    classes={{ paper: 'dialog-container' }}
    {...props}
  />
);

export default Container;