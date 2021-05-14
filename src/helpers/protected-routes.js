import PropTypes from "prop-types";
import * as ROUTES from "../constants/routes";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }
        console.log(location);

        if (!user) {
          return (
            <Redirect
              to={{ pathname: ROUTES.LOGIN, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    ></Route>
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
