import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

function App() {
  const { token } = useSelector((state) => state.user);
  let user = false;
  if (token) user = true;

  const GoogleAuthRegisterWrapper = () => {
    return (
      <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
      >
        <Register></Register>
      </GoogleOAuthProvider>
    );
  };

  const GoogleAuthLoginWrapper = () => {
    return (
      <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
      >
        <Login></Login>
      </GoogleOAuthProvider>
    );
  };

  return (
    <Router>
      <Suspense
        fallback={
          <div className="load">
            <PulseLoader size={15} color="#36d7b7" />
          </div>
        }
      >
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <GoogleAuthLoginWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <GoogleAuthRegisterWrapper />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
