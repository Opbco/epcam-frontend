import React from "react";
import AppSearchBar from "../../components/admin/AppSearchBar";
import SideBar from "../../components/admin/SideBar";
import AppFooter from "../../components/admin/AppFooter";
import ErrorBoundary from "../../utils/ErrorBoundary";
import Unauthorized from "../Unauthorized";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

const AdminLayout = ({ authenticated, role }) => {
  const location = useLocation();

  return (!authenticated) ? <Navigate to="/login" state={{ from: location }} replace /> :
    (role === 'ROLE_ADMIN' || role === 'ROLE_SUPER_ADMIN') ? (
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
        <ErrorBoundary>
          <SideBar />
        </ErrorBoundary>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}>
          <ErrorBoundary>
            <AppSearchBar />
          </ErrorBoundary>
          <Outlet />
          <AppFooter />
        </div>
      </div>
    ) : <Unauthorized />;
};

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  role: state.credentials.role,
});

export default connect(mapStateToProps)(AdminLayout);
