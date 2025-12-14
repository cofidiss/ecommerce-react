import React from "react";
import type { AppContextType, CustomModalProps } from "../Models/Models";

const AppContext = React.createContext<AppContextType>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
  setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>) => {},
  setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>) => {},
  refreshNavbar: () => {},
  setIsLoggedIn: () => {},
  isLoggedIn: false,
  setUserRoles: () => {},
  globalCss: { componentBackgroundColor: '#f9f9f933' },
  userRoles: []
});

export default AppContext;
