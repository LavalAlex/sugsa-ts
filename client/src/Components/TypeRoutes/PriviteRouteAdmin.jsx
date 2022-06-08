import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminLogout} from "../../Redux/Actions/Admin";

function PrivateRoute() {
  const admin = useSelector((state) => state.authAdmin.user?.token);
  const expires = useSelector((state) => state.authAdmin.expires);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  if (expires) {
    if (new Date(Date.now()) > new Date(expires)) {
      dispatch(adminLogout());
      alert("Session expired");
      return navigate("/admin/login");
    }
  }
  return admin? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;