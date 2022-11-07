import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  ChurchRounded,
  EventNote,
  FacebookSharp,
  Instagram,
  LinkedIn,
  LocationCityTwoTone,
  Menu,
  PhoneAndroidRounded,
  Twitter,
} from "@mui/icons-material";
import { Box, Stack, styled } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect, useState } from "react";

const Header = styled("header")`
  ${({ theme }) => `
  display: flex;
  flex-direction: column;
  height: 500px;
  background-image: url("./assets/images/bg_slider_01.jpg"),
    url("./assets/images/bg_slider_02.jpg"),
    url("./assets/images/bg_slider_03.jpg");
  background-repeat: no-repeat;
  width: 100%;
  animation: backgroundslider 12s infinite ease-in-out;
`}
`;

const FootItem = styled("div")`
  ${({ theme }) => `
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 300px;
  text-align: center;
  padding: 1rem;
`}
`;

function App() {
  const { i18n, t } = useTranslation(["common"]);
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(i18next.language === "en" ? "fr" : "en");
  };

  const lang = i18next.language === "en" ? "fr" : "gb";

  useEffect(function () {
    const listenOnScroll = window.addEventListener("scroll", (e) => {
      if (window.scrollY > 440) {
        document.querySelector(".app__nav-bar").classList.add("app__nav-fixed");
      } else {
        document
          .querySelector(".app__nav-bar")
          .classList.remove("app__nav-fixed");
      }
    });
    return () => {
      window.removeEventListener("scroll", listenOnScroll);
    };
  }, []);

  return (
    <div className="app">
      <Header>
        <nav className="app__nav-bar">
          <div className="app__logo">
            <a href="#">
              <img src="./assets/images/logo-epc.png" alt="logo" />
            </a>
          </div>
          <ul
            className={`app__nav-barmenu ${open && "active"}`}
            role="navigation"
            onClick={() => setOpen(false)}
          >
            <li>
              <NavLink to="/#content">Home</NavLink>
            </li>
            <li>
              <a href="/login#content">About Us</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Programmations</a>
            </li>
            <li>
              <NavLink to="/contact"> News </NavLink>
            </li>
            <li>
              <Tooltip title={t("changeLanguage")}>
                <img
                  onClick={handleLanguageChange}
                  style={{ cursor: "pointer" }}
                  loading="lazy"
                  width="20"
                  height="15"
                  src={`https://flagcdn.com/20x15/${lang}.png`}
                  srcSet={`https://flagcdn.com/40x30/${lang}.png 2x`}
                  alt={lang}
                />
              </Tooltip>
            </li>
          </ul>
          <div
            onClick={() => setOpen((prev) => !prev)}
            style={{ cursor: "pointer", zIndex: 1000 }}
            className="menu-button"
          >
            <Menu color="secondary" fontSize="large" />
          </div>
        </nav>
        <div className="app__slider-content">
          <h1>Eglise Presbitérienne du Cameroun</h1>
          <h3>Glory always be to the Lord</h3>
          <div className="app__slider-button">
            <NavLink to="/login#content" className="btn">
              Register
            </NavLink>
            or
            <NavLink to="/login#content" className="btn">
              Sign In
            </NavLink>
          </div>
        </div>
      </Header>
      <section className="app__breadcrumb-section">
        <nav aria-label="Breadcrumb" class="app__breabcrumb">
          <ol>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#synode/23">Synode</a>
            </li>
            <li>
              <a href="#synode/progrqmmqtions/latest" aria-current="page">
                Programmations
              </a>
            </li>
          </ol>
        </nav>
      </section>
      <div className="content">
        <main id="content">
          <Outlet />
        </main>
      </div>
      <footer>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="flex-end"
        >
          <FootItem>
            <ChurchRounded />
            <h3>Hours of online prayers</h3>
            <p>07:00am to 10:00pm</p>
          </FootItem>
          <FootItem>
            <PhoneAndroidRounded />
            <h3>Phone</h3>
            <p>+237 673-456-789</p>
            <p>+237 220-222-333</p>
          </FootItem>
          <FootItem>
            <EventNote />
            <h3>email</h3>
            <p>shaikhanas@gmail.com</p>
            <p>anasbhai@gmail.com</p>
          </FootItem>
          <FootItem>
            <LocationCityTwoTone />
            <h3>address</h3>
            <p>Yaounde, Djoungolo - Cameroon</p>
          </FootItem>
        </Box>
        <Stack direction="row" gap={2}>
          <a href="#">
            <FacebookSharp fontSize="large" />
          </a>
          <a href="#">
            <Twitter fontSize="large" />
          </a>
          <a href="#">
            <Instagram fontSize="large" />
          </a>
          <a href="#">
            <LinkedIn fontSize="large" />
          </a>
        </Stack>
        <div className="credit">
          <div className="footer_links">
            <ul role="navigation">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contacts</a>
              </li>
              <li>
                <a href="#">Terms of Services</a>
              </li>
            </ul>
          </div>
          <div className="copyright">
            <span> &copy; OPBco-Enginneer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
