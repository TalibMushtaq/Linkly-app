import { useState } from "react";
import { Input } from "../components/ui/Input";

export const SigninForm = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <Input
        title="Sign In"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => console.log("Sign In:", data)}
        email
        password
      />
    </div>
  );
};
