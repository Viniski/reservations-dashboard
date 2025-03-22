import { IconButton } from '@mui/material';
import { ChildrenProps } from '../../types/reservation';


interface AppDialogTitleProps extends ChildrenProps {
  onClose?: () => void;
}

const Title = ({ children, onClose }: AppDialogTitleProps) => (
  <h2 className="dialog-title">
    {children}
    {onClose && (
      <IconButton
        aria-label="close"
        className="dialog-close-button"
        onClick={onClose}
      >
        X
      </IconButton>
    )}
  </h2>
);

export default Title;
