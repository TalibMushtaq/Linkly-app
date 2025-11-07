import { useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "../../assets/icons/crossIcon";

interface InputProps {
  title: string;
  email: boolean;
  password: boolean;
  username?: boolean;
  fullname?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void | Promise<void>;
}

export const Input = ({
  title,
  email,
  password,
  username,
  fullname,
  isOpen,
  onClose,
  onSubmit,
}: InputProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <CrossIcon size="md" />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {fullname && (
            <input
              name="fullname"
              type="text"
              placeholder="Full name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          )}

          {username && (
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          )}

          {email && (
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          )}

          {password && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          )}

          <div className="pt-4 flex justify-center">
            <Button
              variant="Primary"
              size="xl"
              text="Submit"
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
