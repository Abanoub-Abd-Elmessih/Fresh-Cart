import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useContext(AuthContext);

  return token ? (
    children
  ) : (
    <Navigate to={"/Login"} />
  );
}
