import {
  LineStyle,
  AssignmentInd,
  TrendingUp,
  PermIdentity,
  Verified,
  ImportExport,
  VpnKey,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Timeline,
  ExitToApp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useTranslation } from "react-i18next";
import { logoutUser } from "./../../redux/actions/UserActions";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";

const SideBar = ({ user, authenticated, showSideBar }) => {
  const { t } = useTranslation(["common"]);
  const sideBarRef = useRef(null);

  useEffect(() => {
    let widthMe = sideBarRef.current.clientWidth;
    sideBarRef.current.style.setProperty("--sideBarWidth", `${widthMe}px`);
  }, []);

  return (
    <div ref={sideBarRef} className={`sidebar ${showSideBar ? "" : "close"}`}>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <Link to="/" className="link">
                <LineStyle className="sidebarIcon" />
                Home
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/users" className="link">
                <PermIdentity className="sidebarIcon" />
                Users
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/diplomes/consult" className="link">
                <Verified className="sidebarIcon" />
                Consulter diplômes
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/diplomes/import" className="link">
                <ImportExport className="sidebarIcon" />
                Importer diplômes
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/diplomes/signature" className="link">
                <VpnKey className="sidebarIcon" />
                Signer diplômes
              </Link>
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Account Settings</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Profile
            </li>
            <li className="sidebarListItem">
              <AssignmentInd className="sidebarIcon" />
              Update Account
            </li>
            <li className="sidebarListItem">
              <ExitToApp className="sidebarIcon" />
              {t("logout")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    user: state.credentials,
    showSideBar: state.showSideBar,
  };
};

const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);
