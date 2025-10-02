import React, { createContext, useState } from "react";

type ModuleContextType = {
  modules: Record<string, string[]>;
  setModules: (modules: Record<string, string[]>) => void;
};

const defaultUserCtx: ModuleContextType = {
  modules: {},
  setModules: () => { /* no-op */ },
}

const ModuleContext = createContext<ModuleContextType>(defaultUserCtx);

const ModuleProvider = ({ children }: { children: React.ReactNode }) => {
  const [modules, setModules] = useState<Record<string, string[]>>({});

  return (
    <ModuleContext.Provider value={{ modules, setModules }}>
      {children}
    </ModuleContext.Provider>
  );
}

export { ModuleProvider, ModuleContext }