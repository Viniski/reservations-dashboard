import { ChildrenProps } from "../../types/reservation";

const Description = ({ children }: ChildrenProps) => (
  <p style={{ color: 'gray' }}>{children}</p>
);

export default Description;
