import { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/Input";

interface SigninResponse {
  token: string;
  message?: string;
}

interface SigninError {
  message: string;
}

export const SigninForm = () => {
  const [showModal, setShowModal] = useState(true);

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
      if (axios.isAxiosError<SigninError>(error)) {
        const serverMessage = error.response?.data?.message;
        console.error("Signin error:", serverMessage || error.message);
        alert(serverMessage || "Invalid email or password");
      } else if (error instanceof Error) {
        console.error("Signin error:", error.message);
        alert(error.message);
      } else {
        console.error("Unknown signin error:", error);
        alert("Unexpected error occurred during signin.");
      }
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
