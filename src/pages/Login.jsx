import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/styles/Login.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosUtils";
import { setToken } from "../features/userSlice";
import Header from "../components/Header/Header";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        setLoading(false);
        toast.success(data.message);

        dispatch(
          setToken({
            token: data.token,
            user: data.user,
          })
        );

        if (data.user.role === "user") {
          navigate("/");
        } else {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const responseGoogle = async (response) => {
    try {
      if (response["code"]) {
        setGoogleLoading(true);
        const { data } = await axiosInstance.get(
          `/api/user/google-login?code=${response["code"]}`
        );

        if (data.success) {
          toast.success(data.message);
          setGoogleLoading(false);

          dispatch(
            setToken({
              token: data.token,
              user: data.user,
            })
          );

          if (data.user.role === "user") {
            navigate("/");
          } else {
            navigate("/admin/dashboard");
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: `auth-code`,
  });

  return token ? (
    <Navigate to="/" />
  ) : (
    <>
      <Header />
      <div className="login-div">
        <form className="loginform" onSubmit={loginHandler}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={loading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "Login"}
          </button>
          <Link to="/register" className="signup">
            Don&apos;t have an account? <span>Signup</span>
          </Link>

          <button className="google" onClick={googleLogin}>
            {googleLoading ? (
              <PulseLoader color="#fff" size={5} />
            ) : (
              "Login with Google"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
