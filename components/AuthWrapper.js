import React from "react";
import { getToken } from "../helper/auth";
import Login from "../pages/login";


const token = getToken("token");
console.log(token)
const AuthWrapper = (Component) => {
  const Auth = () => {
    // if token exists, return component
    if (token) {
      return <Component />;
    }

    //if token doesnt exist
    return <Login />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default AuthWrapper;
