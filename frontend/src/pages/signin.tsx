import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

interface SigninResponse {
  token: string;
  message?: string;
}

interface VerifyResponse {
  valid: boolean;
}

export const SigninForm = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get<VerifyResponse>(
          "http://localhost:5000/api/user/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.valid) {
          console.log("Token valid — redirecting...");
          navigate("/dashboard");
        } else {
          console.log("Token invalid — clearing...");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("token");
      }
    }

    verifyToken();
  }, [navigate]);
  async function handleSignin(data: Record<string, string>) {
    try {
      const response = await axios.post<SigninResponse>(
        "http://localhost:5000/api/user/signin",
        {
          email: data.email,
          password: data.password,
        }
      );

      const token = response.data.token;

      if (!token) throw new Error("Token missing in response");

      localStorage.setItem("token", token);

      alert("Signin successful");
      setShowModal(false);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Invalid credentials"
        : "Signin failed";
      alert(message);
    }
  }

  return (
    <div>
      <Input
        title="Sign In"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSignin}
        email
        password
      />
    </div>
  );
};
