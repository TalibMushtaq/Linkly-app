import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  async function handleSignup(data: Record<string, string>) {
    try {
      const { fullname, username, email, password } = data;

      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          fullname,
          username,
          email,
          password,
        }
      );

      const token = response.data.token;
      if (!token) throw new Error("Token missing in response");

      localStorage.setItem("token", token);
      toast.success("Account created successfully! Redirecting now...");

      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed. Please try again.");
    }
  }

  return (
    <div>
      <Input
        title="Sign Up"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSignup}
        email
        username
        fullname
        password
      />
    </div>
  );
};
