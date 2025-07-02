import { API_BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

async function verificarAutenticacion() {
  const response = await fetch(`${API_BASE_URL}/auth/me/`, {
    credentials: "include",
  });
  console.log(response)
  return response.ok;
}

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    verificarAutenticacion().then((res) => {
      setAuth(res);
    });
  }, []);

  if (auth === null) return <div>Cargando...</div>

  if (!auth) return <Navigate to="/login" replace />

  return children;
};

export default ProtectedRoute;