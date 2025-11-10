import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface VerifyResponse {
  valid: boolean;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const res = await axios.get<VerifyResponse>(`${API_URL}/user/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data.valid) {
          localStorage.removeItem("token");
          navigate("/signin", { replace: true });
        }
      } catch {
        localStorage.removeItem("token");
        navigate("/signin", { replace: true });
      } finally {
        setChecking(false);
      }
    }

    verifyToken();
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex h-screen justify-center items-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}
