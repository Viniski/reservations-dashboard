import { MouseEvent, useState } from 'react';

const useAnchorElement = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const onToggle = (event: MouseEvent<HTMLElement>) => setAnchorEl(anchorEl ? null : event.currentTarget);

  return { anchorEl, setAnchorEl, onToggle };
};

export default useAnchorElement;
