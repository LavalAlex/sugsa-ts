import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../Redux/Actions/Auth";

function PrivateRoute() {
  const admin = useSelector((state) => state.admin);
  const expires = useSelector((state) => state.admin.expires);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(expires){
    if(new Date(Date.now()) > new Date(expires) ){
      dispatch(logoutAdmin())
      alert("Session expired")
      return navigate("/login")
    }
  }
  return admin?.name ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
