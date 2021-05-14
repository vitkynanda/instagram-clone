import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function IsUserLoggedIn({
  user,
  children,
  loggedInPath,
  ...rest
}) {
  console.log(loggedInPath);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        console.log(location);
        if (user) {
          return (
            <Redirect
              to={{ pathname: ROUTES.DASHBOARD, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    ></Route>
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
  loggedInPath: PropTypes.string.isRequired,
};
