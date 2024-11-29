import { Link } from "react-router-dom";
import "../components/styles/NotFound.scss";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to={`/${user?.role === "admin" ? "admin/dashboard" : ""}`}
        className="not-found__link"
      >
        {user?.role === "admin" ? "Go to Dashboard" : "Go to Home"}
      </Link>
    </div>
  );
};

export default NotFound;
