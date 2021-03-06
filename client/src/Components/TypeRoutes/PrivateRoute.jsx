import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Actions/Auth";

function PrivateRoute() {
  const admin = useSelector((state) => state.auth.user?.token);
  const expires = useSelector((state) => state.auth.expires);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  if (expires) {
    if (new Date(Date.now()) > new Date(expires)) {
      dispatch(logout());
      alert("Session expired");
      return navigate("/login");
    }
  }
  return admin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
