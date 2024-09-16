import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
