import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Header from "../components/Header/Header";
import "../components/styles/Login.scss";
import { setToken } from "../features/userSlice";
import axiosInstance from "../utils/axiosUtils";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axiosInstance.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        setLoading(false);

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
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
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
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <button disabled={loading || googleLoading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "Signup"}
          </button>

          <Link to="/login" className="signup">
            Already have an account? <span>Login</span>
          </Link>

          <button
            disabled={googleLoading || loading}
            className="google"
            onClick={googleLogin}
          >
            {googleLoading ? (
              <PulseLoader color="#fff" size={5} />
            ) : (
              "Continue with Google"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
