import React, { useState } from "react";
import { CrossIcon } from "../../assets/icons/crossIcon";
import { Button } from "./Button";
import { YoutubeIcon } from "../../assets/icons/youtubeIcon";
import { XIcon } from "../../assets/icons/XIcon";

interface CreateContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
}

export const CreateContentForm: React.FC<CreateContentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<"youtube" | "X">("youtube");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) {
      alert("Please fill in both title and URL fields.");
      return;
    }

    onSubmit({ title, link, type });
    setTitle("");
    setLink("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <CrossIcon size="md" />
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Add {type === "youtube" ? "YouTube" : "X"} Link
          </h2>

          {/* Toggle buttons */}
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setType("youtube")}
              className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 font-semibold transition ${
                type === "youtube"
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <YoutubeIcon size="lg" />
            </button>

            <button
              type="button"
              onClick={() => setType("X")}
              className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 font-semibold transition ${
                type === "X"
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <XIcon size="lg" />
            </button>
          </div>

          {/* Input fields */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder={
              type === "youtube"
                ? "Paste YouTube video URL"
                : "Paste X (Twitter) post URL"
            }
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <div className="pt-2 flex justify-center">
            <Button
              variant="Primary"
              size="lg"
              text="Submit"
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
