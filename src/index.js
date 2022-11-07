import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";
import Authorized from "./utils/Authorized";
import AdminLayout from "./pages/ProtectedPages/AdminLayout";
import reportWebVitals from "./reportWebVitals";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import AppContent from "./components/admin/AppContent";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#02a0c3",
    },
    secondary: {
      main: "#faead6",
    },
  },
  typography: {
    fontSize: 12,
    caption: {
      color: blue[400],
      fontSize: 22,
      fontWeight: 700,
      textTransform: "uppercase",
      textShadow: "-0.3rem 1.1rem 0rem hsla(191, 59%, 41%, 0.2)",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress sx={{ alignSelf: "center" }} />
          </Box>
        }
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route
                    path="login"
                    element={
                      <Authorized auth={false}>
                        <Login />
                      </Authorized>
                    }
                  />
                  <Route path="contact" element={<Contact />} />
                  <Route
                    path="*"
                    element={
                      <Box
                        display="grid"
                        style={{ placeItems: "center", minHeight: "100vh" }}
                      >
                        <Typography variant="h2" color="primary">
                          Error 404: Page Not Found
                        </Typography>
                      </Box>
                    }
                  />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AppContent />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
