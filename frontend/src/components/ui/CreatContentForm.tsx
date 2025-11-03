import React from "react";
import { CrossIcon } from "../../assets/icons/crossIcon";
import { Button } from "./Button";

interface CreateContentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContentForm: React.FC<CreateContentFormProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
     
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

     
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
      
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <CrossIcon size="md" />
          </button>
        </div>

        
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="URL"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <div className="pt-2 flex justify-end">
            <Button
              variant="Primary"
              size="md"
              text="Submit"
              onClick={() => {
                console.log("Submit clicked");
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
