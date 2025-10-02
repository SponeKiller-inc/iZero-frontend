import { UserProvider } from "./UserContext";
import { ModuleProvider } from "./ModuleContext";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ModuleProvider>
        {children}
      </ModuleProvider>
    </UserProvider>
  );
}

export default AppProviders