import { UserProvider } from "./UserContext";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
          {children}
    </UserProvider>
  );
}

export default AppProviders