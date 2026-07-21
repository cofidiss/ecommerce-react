import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import type { CustomModalProps, UserRole } from "../Models/Models";
import AppContext from "../Contexts/AppContext";


import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "../components/Navbar/Navbar";
import { Backdrop, Box, CircularProgress, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import CustomModal from "../components/CustomModal/CustomModal";
import { initWebSocket } from "../services/websocketService";
import { Client } from "@stomp/stompjs";
import { IsLoggedIn } from "../services/authService";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f2f5', // Arka plan rengi
    },
  },
});


 const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]); 
  const navigate = useNavigate();
  const socketRef = useRef<Client | null>(null);

  const [modal1State, setModal1State] = useState<CustomModalProps>({
    isOpen: false,
    title: '',
    message: undefined,
    okButtonText: undefined,
    okButtonClick: undefined,
    leftButtonText: undefined,
    leftButtonClick: undefined,
    rightButtonText: undefined,
    rightButtonClick: undefined,
    children: undefined,
  });
  const [modal2State, setModal2State] = useState<CustomModalProps>({
    isOpen: false,
    title: '',
    message: undefined,
    okButtonText: undefined,
    okButtonClick: undefined,
    leftButtonText: undefined,
    leftButtonClick: undefined,
    rightButtonText: undefined,
    rightButtonClick: undefined,
    children: undefined,
  });
  const startLoading = () => setLoadingCount((prev) => prev + 1);

  const stopLoading = () => {
    debugger;

    setLoadingCount((prev) => prev - 1);
  };

  const refreshNavbar = () => {
    // Implement the logic to refresh the navbar
    console.log('Navbar refreshed');
  };

  useEffect(() => {
    console.log('isLoggedIn' + isLoggedIn);
   if(isLoggedIn){
  socketRef.current = initWebSocket(setModal2State,navigate);
    }
   else {
    socketRef.current?.deactivate();
   }
    return () => {
      socketRef.current?.deactivate();
    }

  }, [isLoggedIn]);
  useEffect(() => {
    IsLoggedIn(baseUrl).then((isAuthenticated) => {
      setIsLoggedIn(isAuthenticated);
    });
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContext.Provider
        value={{
          loading: loadingCount > 0,
          startLoading: startLoading,
          stopLoading: stopLoading,
          setModal1State: setModal1State,
          setModal2State: setModal2State,
          refreshNavbar: refreshNavbar,
          setIsLoggedIn: setIsLoggedIn,
          isLoggedIn: isLoggedIn,
          globalCss: { componentBackgroundColor: '#f9f9f933' },
          userRoles: userRoles,
          setUserRoles: setUserRoles    
        }}
      >
        <Navbar />
        <ThemeProvider theme={theme}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          
                 bgcolor="rgba(56, 39, 39, 0)"
              boxShadow={3}
              borderRadius={2}
          >           <CssBaseline />
          {children}</Box>

        </ThemeProvider>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
          open={loadingCount > 0}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <CustomModal
          isOpen={modal1State.isOpen}
          title={modal1State.title}
          message={modal1State.message}
          leftButtonClick={modal1State.leftButtonClick}
          leftButtonText={modal1State.leftButtonText}
          rightButtonClick={modal1State.rightButtonClick}
          rightButtonText={modal1State.rightButtonText}
          okButtonClick={modal1State.okButtonClick}
          okButtonText={modal1State.okButtonText}
        >
          {modal1State.children}
        </CustomModal>
        <CustomModal
          isOpen={modal2State.isOpen}
          title={modal2State.title}
          message={modal2State.message}
          leftButtonClick={modal2State.leftButtonClick}
          leftButtonText={modal2State.leftButtonText}
          rightButtonClick={modal2State.rightButtonClick}
          rightButtonText={modal2State.rightButtonText}
          okButtonClick={modal2State.okButtonClick}
          okButtonText={modal2State.okButtonText}
        >
          {modal2State.children}
        </CustomModal>
      </AppContext.Provider>
    </LocalizationProvider>
  );
};

export default AppProvider;