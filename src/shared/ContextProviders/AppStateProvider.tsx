import React, { createContext, useContext } from "react";

const AppStateContext = createContext({});
export const AppStateProvider = () => {
  return <AppStateContext.Provider value={{}}></AppStateContext.Provider>;
};

export const useAppStateContext = () => {
  const AppStateContextState = useContext(AppStateContext);
  return AppStateContextState;
};
