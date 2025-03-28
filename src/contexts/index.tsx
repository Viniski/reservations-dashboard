import { ChildrenProps } from "../types/reservation";
import { SnackbarProvider } from "notistack";
import QueryClientProvider from "./queryClientProvider";

const AppContextsProvider = ({ children }: ChildrenProps) => (
  <SnackbarProvider autoHideDuration={3000}>
    <QueryClientProvider>{children}</QueryClientProvider>
  </SnackbarProvider>
);

export default AppContextsProvider;
