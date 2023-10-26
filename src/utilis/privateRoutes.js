import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../api/tempAuth";

const PrivateRoutes = () => {
  let auth = { token: getToken() };
  return auth.token ? <Outlet /> : <Navigate to="/progSignUp" />;
};

export default PrivateRoutes;
