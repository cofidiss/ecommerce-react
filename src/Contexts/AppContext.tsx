import React from "react";
import type { AppContextType } from "../Models/Models";

const AppContext = React.createContext<AppContextType>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
  setModal1State: () => {},
  setModal2State: () => {},
  refreshNavbar: () => {},
  setIsLoggedIn: () => {},
  isLoggedIn: false,
  setUserRoles: () => {},
  globalCss: { componentBackgroundColor: '#f9f9f933' },
  userRoles: []
});

export default AppContext;
