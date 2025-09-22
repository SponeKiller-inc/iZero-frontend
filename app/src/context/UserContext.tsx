import React, { createContext, useState } from "react";

type UserContextType = {
  userID: number | null;
  setUserID: (userID: number | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userID, setUserID] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider