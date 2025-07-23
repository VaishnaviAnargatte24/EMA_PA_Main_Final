import React, {createContext, useContext, useState} from 'react';

export const HomeContext = createContext<{
  //
}>({
  //
});

export const HomeContextProvider = ({children}: {children: any}) => {
  return <HomeContext.Provider value={{}}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
