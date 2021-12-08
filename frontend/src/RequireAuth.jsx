import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./contexts/AuthContext";

export default function RequireAuth({ children }) {
  const { authenticatedUser } = useContext(AuthContext);

  if (authenticatedUser == null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
