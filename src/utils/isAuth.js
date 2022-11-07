import { connect } from "react-redux";

const isAuth = ({ authenticated, islogged, children }) => {
  if (islogged === authenticated) {
    return children;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
});
export default connect(mapStateToProps)(isAuth);
