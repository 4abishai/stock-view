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

// Assume CandlestickChart is imported correctly
import CandlestickChart from "./CandlestickChart";

const drawerWidth = 249; // Set drawer width

function MyApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("meta"); // State to track selected company
  const [showSMA, setShowSMA] = useState(false); // State to track SMA visibility
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // For screens smaller than 960px

  // Toggle Drawer function
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle button click to set selected company
  const handleButtonClick = (companyName) => {
    console.log(companyName);
    setSelectedCompany(companyName); // Update the selected company
  };

  // Toggle SMA visibility
  const handleSMAClick = () => {
    setShowSMA((prev) => !prev); // Toggle the showSMA state
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
          {/* Spacer to push GitHub icon to the right */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            sx={{
              padding: 0,
              backgroundColor: "#ffffff",
            boxShadow: "0 0 24px rgba(0, 0, 0, 0.3)", // Initial shadow
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
          keepMounted: true, // Keeps the drawer in the DOM when hidden
        }}
        sx={{
          height: "calc(100% - 64px)", // Adjust height for AppBar
          top: 64, // Matches AppBar height
          width: isMobile ? "auto" : `${drawerWidth}px`,
          "& .MuiDrawer-paper": {
            height: "calc(100% - 64px)",
            top: 64,
            boxSizing: "border-box",
            width: `${drawerWidth}px`,
            display: "flex",
            flexDirection: "column", // Ensures the content fills the drawer height
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#242424",
            color: "white",
            flexGrow: 1, // Makes the Box grow to fill the available space
            display: "flex",
            flexDirection: "column",
            justifyContent: "justify-content", // Optional, to separate sections
          }}
        >
          <Box>
            <Typography variant="h6">Company</Typography>
            <Divider sx={{ backgroundColor: "white" }} />
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
                  variant="contained"
                  sx={{
                    width: "100%",
                    marginBottom: 1,
                    color: "white",
                    backgroundColor: "#e84529",
                  }}
                  onClick={() => handleButtonClick(name)}
                >
                  {name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Tools</Typography>
            <Divider sx={{ backgroundColor: "white" }} />
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                mt: 4,
                color: "white",
                borderColor: "white",
              }}
              onClick={handleSMAClick}
            >
              SMA
            </Button>
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
          marginLeft: isMobile ? 0 : `0px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)", // Ensures the content fills the viewport height minus AppBar
        }}
      >
        <Box
          sx={{
            height: "80%",
            width: "85%",
            padding: 5,
            borderRadius: "16px", // Border radius for rounded corners
            backgroundColor: "#ffffff",
            boxShadow: "0 0 24px rgba(0, 0, 0, 0.2)", // Initial shadow
            border: "1px solid #e0e0e0", // Optional light border
            transition: "box-shadow 0.3s ease-in-out", // Smooth transition for shadow change
            "&:hover": {
              boxShadow: "0 0 32px rgba(0, 0, 0, 0.35)", // Darker shadow on hover
            },
          }}
        >
          <Typography variant="h4" align="center">
            {/* Pass selectedCompany and showSMA as props to CandlestickChart */}
            <CandlestickChart
              selectedCompany={selectedCompany}
              showSMA={showSMA}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MyApp;
