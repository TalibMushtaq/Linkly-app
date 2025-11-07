import { useState } from "react";
import { Input } from "../components/ui/Input";

export const SignupForm = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <Input
        title="Sign Up"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => console.log("Sign Up:", data)}
        email
        username
        fullname
        password
      />
    </div>
  );
};
