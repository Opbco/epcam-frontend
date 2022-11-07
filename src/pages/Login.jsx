import React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Box
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  KeySharp,
  Mail,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, registerUser, clearErrors } from "./../redux/actions/UserActions";
import Alert from "@mui/material/Alert";
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ background: "#fff" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Grid = styled("div")({
  display: "grid",
  placeItems: "center",
  minHeight: "60vh",
  width: "100%",
});


const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  justifyContent: "space-around",
  marginTop: 24,
});

const Login = ({ error, isLoading, loginUser, registerUser, clearErrors }) => {
  const { t } = useTranslation(["login"]);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const from = location.state?.from?.pathname || "/";
  let navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  isLoading = false;
  const handleClickShowPassword = () => {
    setCredentials({
      ...credentials,
      showPassword: !credentials.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = (e, type) => {
    e.preventDefault();
    if (type == 'login') {
      registerUser(credentials, navigate, from);
    } else {

      loginUser(credentials, navigate, from);
    }
  };


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid id="#flogin">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="login registration tabs">
            <Tab label={t("seconnecter")} {...a11yProps(0)} />
            <Tab label={t("register")} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box>
            <Typography
              component="h3"
              variant="caption"
              align="center"
            >
              {t("title")}
            </Typography>
            {isLoading ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : (
              <>
                <Form>
                  {error && (
                    <Alert
                      onClose={() => {
                        clearErrors();
                      }}
                      severity="error"
                    >
                      {error}
                    </Alert>
                  )}
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="username">{t("username")}</InputLabel>
                    <Input
                      id="username"
                      value={credentials.pseudo}
                      onChange={handleChange("username")}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="password">{t("password")}</InputLabel>
                    <Input
                      id="password"
                      type={credentials.showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={handleChange("password")}
                      startAdornment={
                        <InputAdornment position="start">
                          <KeySharp />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {credentials.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{ alignSelf: "flex-end", marginTop: 2 }}
                    onClick={(e) => submitForm(e, 'login')}
                  >
                    {t("seconnecter")}
                  </Button>
                </Form>
              </>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <Typography
              component="h3"
              variant="caption"
              align="center"
            >
              {t("titler")}
            </Typography>
            {isLoading ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : (
              <>
                <Form>
                  {error && (
                    <Alert
                      onClose={() => {
                        clearErrors();
                      }}
                      severity="error"
                    >
                      {error}
                    </Alert>
                  )}
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="email">{t("email")}</InputLabel>
                    <Input
                      id="email"
                      required
                      value={credentials.email}
                      onChange={handleChange("email")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Mail />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="username">{t("username")}</InputLabel>
                    <Input
                      required
                      id="username"
                      value={credentials.pseudo}
                      onChange={handleChange("username")}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="password">{t("password")}</InputLabel>
                    <Input
                      id="password"
                      type={credentials.showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={handleChange("password")}
                      startAdornment={
                        <InputAdornment position="start">
                          <KeySharp />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {credentials.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{ alignSelf: "flex-end", marginTop: 2 }}
                    onClick={(e) => submitForm(e, 'register')}
                  >
                    {t("register")}
                  </Button>
                </Form>
              </>
            )}
          </Box>
        </TabPanel>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.errors,
  isLoading: state.loading,
});

const mapActionsToProps = {
  loginUser,
  clearErrors,
  registerUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
