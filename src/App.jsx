import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CandlestickChart from "./CandlestickChart";

const drawerWidth = 249;

function MyApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("meta");
  const [showSMA, setShowSMA] = useState(false);
  const [smaDays, setSmaDays] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleButtonClick = (companyName) => {
    setSelectedCompany(companyName);
  };

  const handleSMAClick = () => {
    setShowSMA((prev) => !prev);
  };

  const handleDaysChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setSmaDays(value);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundImage:
            "linear-gradient(to right, #e84529, #ff0066, #8058bc)",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            StockView
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            sx={{
              padding: 0,
              backgroundColor: "#ffffff",
              boxShadow: "0 0 24px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#ffffff",
                boxShadow: "0 0 16px rgba(0, 0, 0, 0.4)",
              },
              transition: "box-shadow 0.3s ease-in-out",
              borderRadius: "12px",
              minWidth: "35px",
              minHeight: "35px",
            }}
            href="https://github.com/4abishai/stock-view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/stock-view/github-mark.png"
              alt="GitHub Icon"
              style={{ width: 25, height: 25 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? drawerOpen : true}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          height: "calc(100% - 64px)",
          top: 64,
          width: isMobile ? "auto" : `${drawerWidth}px`,
          "& .MuiDrawer-paper": {
            height: "calc(100% - 64px)",
            top: 64,
            boxSizing: "border-box",
            width: `${drawerWidth}px`,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1b1917",
            // Remove default drawer styles
            background: "none",
            boxShadow: "none",
            border: "none",
            // Add a pseudo-element for the red border
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.40)",
              zIndex: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#1b1917",
            color: "white",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "justify-content",
          }}
        >
          {/* Company Section */}
          <Box>
            <Typography variant="h6" sx={{ fontSize: "1.2rem", pb: 0.8 }}>
              Company
            </Typography>
            <Divider sx={{ backgroundColor: "rgb(255, 255, 255, 0.60)" }} />
            <Box sx={{ mt: 4 }}>
              {[
                "googl",
                "aapl",
                "msft",
                "amzn",
                "tsla",
                "meta",
                "nflx",
                "nvda",
                "intc",
                "ibm",
              ].map((name) => (
                <Button
                  key={name}
                  variant={selectedCompany === name ? "contained" : "outlined"}
                  sx={{
                    width: "100%",
                    marginBottom: 1,
                    color: "white",
                    border: "none",
                    backgroundColor: selectedCompany === name ? "#44403c" : "",
                    "&:hover": {
                      backgroundColor:
                        selectedCompany === name ? "#57534e" : "#44403c40",
                    },
                  }}
                  onClick={() => handleButtonClick(name)}
                >
                  {name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Indicator Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontSize: "1.2rem", pb: 0.8 }}>
              Indicator
            </Typography>
            <Divider sx={{ backgroundColor: "rgb(255, 255, 255, 0.60)" }} />
            <Button
              variant={showSMA ? "contained" : "outlined"}
              sx={{
                width: "100%",
                mt: 4,
                color: "white",
                borderRadius: "0px",
                border: "none",
                borderLeft: showSMA ? "" : 1,
                borderColor: "#57534f",
                borderWidth: "8px",
                backgroundColor: showSMA ? "#e84529" : "#292524",
                "&:hover": {
                  backgroundColor: showSMA ? "#f0563a" : "#3d3936", // Lighter versions of the original colors
                },
              }}
              onClick={handleSMAClick}
            >
              SMA
            </Button>
            {/* Show TextField only when SMA is selected */}
            {showSMA && (
              <TextField
                id="sma-days"
                label="Days"
                variant="filled"
                type="number"
                value={smaDays}
                onChange={handleDaysChange}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white" },
                  inputProps: { min: 1 },
                }}
                sx={{
                  mt: 2,
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    },
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          pr: 5,
          pl: 5,
          backgroundColor: "#1b1917",
          marginLeft: isMobile ? 0 : `0px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            height: "80%",
            width: "85%",
            padding: 5,
            borderRadius: "16px",
            backgroundColor: "#292524",
            boxShadow: "0 0 24px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgb(224, 224, 224, 0.40)",
            // border: "none",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 0 23px rgba(255, 255, 255, 0.40)",
            },
          }}
        >
          <Typography variant="h4" align="center">
            <CandlestickChart
              selectedCompany={selectedCompany}
              showSMA={showSMA}
              smaDays={smaDays}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MyApp;
