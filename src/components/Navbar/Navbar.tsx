import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";

import {
  Settings as SettingsIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  List as ListIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleSettingsOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => setSettingsAnchorEl(null);


  const handleBasketViewClick = () => {
    navigate("/basket");
     };

  const handleProfileClick = () => {
    navigate("/profile");
    handleSettingsClose();
  };

  const handleLogoutClick = () => {
   
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/user/logout`, {
      method: "POST",
    });
    setIsLoggedIn(false);
    // navigate("/login");
    handleSettingsClose();
  };

  const handleOrderListClick = () => {
    navigate("/orders");
    handleSettingsClose();
  };

  


  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(17, 112, 221, 0.5)" }}
    >
      <Toolbar>
        {true && (
          <Button
            color="inherit"
            onClick={handleOrderListClick}
            startIcon={<ListIcon />}
            sx={{
              borderRadius: "10px",
              padding: "5px 12px",
              minWidth: "140px",
              marginRight: 2,
              "&:hover": {
                border: "2px solid white",
                borderRadius: "4px",
                transform: "scale(1.05)",
              },
            }}
          >
            Order List
          </Button>
        )}


        {/* Sağ Menü */}
        <div style={{ marginLeft: 'auto' }}>

       
        {isLoggedIn ? (
          <>
             {/* Settings Icon with Dropdown Menu */}
            <div
              onMouseEnter={handleSettingsOpen}
              onMouseLeave={handleSettingsClose}
            >
              <IconButton
                color="inherit"
                sx={
                  settingsAnchorEl && {
                    border: "2px solid white",
                    borderRadius: "4px",
                    transform: "scale(1.05)",
                  }
                }
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                id="settings-menu"
                anchorEl={settingsAnchorEl}
                open={Boolean(settingsAnchorEl)}
                onClose={handleSettingsClose}
                MenuListProps={{
                  onMouseLeave: handleSettingsClose,
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    borderRadius: "10px",
                    padding: "5px 0",
                    minWidth: "150px",
                    "& .MuiMenuItem-root": {
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 20px",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "white",
                        transition: "background-color 0.3s ease",
                      },
                    },
                  },
                }}
              >
                   <MenuItem onClick={handleBasketViewClick}>
                  <ShoppingCartIcon sx={{ marginRight: "10px" }} /> Basket
                </MenuItem>
                <MenuItem onClick={handleProfileClick}>
                  <AccountCircleIcon sx={{ marginRight: "10px" }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ExitToAppIcon sx={{ marginRight: "10px" }} /> Log Out
                </MenuItem>                
              </Menu>
            </div>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
              startIcon={<LoginIcon />}
              sx={{
                "&:hover": {
                  border: "2px solid white",
                  borderRadius: "4px",
                  transform: "scale(1.05)",
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/signup")}
              startIcon={<PersonAddIcon />}
              sx={{
                "&:hover": {
                  border: "2px solid white",
                  borderRadius: "4px",
                  transform: "scale(1.05)",
                },
              }}
            >
              Signup
            </Button>
          </>
        )}
         </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;