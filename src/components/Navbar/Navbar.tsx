import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";

import {
  Settings as SettingsIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  ExitToApp as ExitToAppIcon,
  List as ListIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory2 as Inventory2Icon,
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

;

  const handleLogoutClick = () => {
   
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/user/logout`, {
      method: "POST",
    });
    setIsLoggedIn(false);
   navigate("/login");
    handleSettingsClose();
  };

  const handleOrderListClick = () => {
    navigate("/orders");
    handleSettingsClose();
  };

  const handleProductListClick = () => {
    navigate("/products");
    handleSettingsClose();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(211, 47, 47, 0.95)", boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
    >
      <Toolbar>
        {isLoggedIn && (
          <>
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
            <Button
              color="inherit"
              onClick={handleProductListClick}
              startIcon={<Inventory2Icon />}
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
              Product List
            </Button>
          </>
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