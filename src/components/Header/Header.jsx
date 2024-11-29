import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../features/userSlice";
import { toast } from "sonner";
import { GrScorecard } from "react-icons/gr";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, token } = useSelector((state) => state.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <div className="header">
      <GrScorecard color="#fff" size={27} />
      {token ? (
        <div className="me">
          <img src={user?.avatar} alt="avatar" />
          {user.role === "admin" &&
            (location.pathname !== "/admin-dashboard" ? (
              <button
                className="active"
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </button>
            ) : (
              <button className="active" onClick={() => navigate("/")}>
                Go To Home
              </button>
            ))}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="btns">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Header;
