import { useState } from "react";
import { Input } from "../components/ui/Input";

export const SignupForm = () => {
  const [showModal, setShowModal] = useState(true);

  async function handleSignup(data: Record<string, string>) {
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Signup Failed");
      }

      const result = await response.json();
      alert("SignUp Successfull");
      setShowModal(false);
    } catch (err) {
      console.error("Signup error", err);
      alert("Signup failed. Please check your input or try again later.");
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
