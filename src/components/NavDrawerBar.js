import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IsAuth from "../utils/isAuth";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import uuid from "./../utils/Uuid";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { logoutUser } from "./../redux/actions/UserActions";

const drawerWidth = 300;
const comonItems = [
  { name: "home", to: "/", controled: false },
  { name: "consultdiplome", to: "/consult", controled: false },
  { name: "contact", to: "/contact", controled: false },
  { name: "login", to: "/login", controled: true, isLogged: false },
];

function NavDrawerBar({ authenticated, logoutUser, TOGGLE_SIDEBAR }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { i18n, t } = useTranslation(["common"]);

  let navigate = useNavigate();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(i18next.language === "en" ? "fr" : "en");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = (to) => {
    navigate(to);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {process.env.REACT_APP_NAME}
      </Typography>
      <Divider />
      <List>
        {comonItems.map((item) => {
          if (item.controled === false) {
            return (
              <ListItem key={uuid()} disablePadding>
                <ListItemButton sx={{ textAlign: "left" }}>
                  <Link to={item.to}>
                    <ListItemText primary={t(item.name)} />
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          } else {
            return (
              <IsAuth key={uuid()} islogged={false}>
                <ListItem key={uuid()} disablePadding>
                  <ListItemButton sx={{ textAlign: "left" }}>
                    <Link to={item.to}>
                      <ListItemText primary={t(item.name)} />
                    </Link>
                  </ListItemButton>
                </ListItem>
              </IsAuth>
            );
          }
        })}
        <IsAuth islogged={true}>
          <ListItem key={uuid()} disablePadding>
            <ListItemButton
              sx={{ textAlign: "left" }}
              onClick={() => logoutUser(navigate)}
            >
              <ListItemText primary={t("logout")} />
            </ListItemButton>
          </ListItem>
        </IsAuth>
      </List>
    </Box>
  );

  const lang = i18next.language === "en" ? "fr" : "gb";

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              ml: { xs: 3, sm: 0 },
            }}
          >
            {process.env.REACT_APP_NAME}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" }, mr: 1 }}>
              {comonItems.map((item) => {
                if (item.controled === false) {
                  return (
                    <Button
                      onClick={() => handleLinkClick(item.to)}
                      key={uuid()}
                      sx={{ color: "#fff" }}
                    >
                      {t(item.name)}
                    </Button>
                  );
                }
                return (
                  <IsAuth key={uuid()} islogged={false}>
                    <Button
                      onClick={() => handleLinkClick(item.to)}
                      sx={{ color: "#fff" }}
                      key={uuid()}
                    >
                      {t(item.name)}
                    </Button>
                  </IsAuth>
                );
              })}
              <IsAuth islogged={true}>
                <Button
                  onClick={() => logoutUser(navigate)}
                  sx={{ color: "#fff" }}
                  key={uuid()}
                >
                  {t("logout")}
                </Button>
              </IsAuth>
            </Box>
            <Tooltip title={t("changeLanguage")}>
              <img
                onClick={handleLanguageChange}
                style={{ cursor: "pointer", marginTop: "8px" }}
                loading="lazy"
                width="20"
                height="15"
                src={`https://flagcdn.com/20x15/${lang}.png`}
                srcSet={`https://flagcdn.com/40x30/${lang}.png 2x`}
                alt={lang}
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(NavDrawerBar);
