import React from "react";
import { useMsal } from "@azure/msal-react";

const LoginComponent = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return <button onClick={handleLogin}>Sign In</button>;
};

export default LoginComponent;
