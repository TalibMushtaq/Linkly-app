import { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/Input";

export const SignupForm = () => {
  const [showModal, setShowModal] = useState(true);

  async function handleSignup(data: Record<string, string>) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      alert("Signup successful");
      console.log("Response:", response.data);
      setShowModal(false);
    } catch (err: any) {
      if (err.response) {
        console.error("Signup error:", err.response.data);
        alert(err.response.data.message || "Signup failed. Try again later.");
      } else {
        console.error("Signup error:", err.message);
        alert("Signup failed. Please check your connection.");
      }
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
