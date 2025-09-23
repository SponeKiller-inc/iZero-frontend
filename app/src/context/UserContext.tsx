import React, { createContext, useState } from "react";

type UserContextType = {
  userID: number | null;
  setUserID: (userID: number | null) => void;
};

const defaultUserCtx: UserContextType = {
  userID: null,
  setUserID: () => { /* no-op */ },
}

const UserContext = createContext<UserContextType>(defaultUserCtx);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userID, setUserID] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext }