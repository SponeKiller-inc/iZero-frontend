import React, { createContext, useState } from "react";

type UserContextType = {
  userID: number;
  setUserID: (userID: number) => void;
};

const defaultUserCtx: UserContextType = {
  userID: 0,
  setUserID: () => { /* no-op */ },
}

const UserContext = createContext<UserContextType>(defaultUserCtx);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userID, setUserID] = useState<number>(0);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext }