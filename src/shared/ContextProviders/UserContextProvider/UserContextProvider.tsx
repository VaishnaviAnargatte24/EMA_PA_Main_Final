import React, {ComponentType, useContext, useEffect, useState} from 'react';

import {Storage} from '../../../shared/utils/Storage';

const UserContext = React.createContext<{
  userDetails: any | null;
  setUserDetails: any;
}>({
  userDetails: null,
  setUserDetails: () => {},
});

const UserContextProvider = ({children}: {children: any}) => {
  const [userDetails, setUserDetails] = useState<any | null>(null);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  const userContextState = useContext(UserContext);
  return userContextState;
};

export const withUserContext = (Component: ComponentType) => (props: any) =>
  (
    <UserContextProvider>
      <Component {...props} />
    </UserContextProvider>
  );
