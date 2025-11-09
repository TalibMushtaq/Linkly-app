import axios from "axios";
import { API_URL } from "../App";
import { toast } from "sonner";

export function useCreateContent() {
  // Helper for auth header
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // Create new content
  const createContent = async (data: Record<string, string>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be signed in to add content.");
      return null;
    }

    try {
      const res = await axios.post(
        `${API_URL}/v1/content`,
        {
          title: data.title,
          link: data.link,
          tags: [],
          type: data.type || "link",
        },
        getAuthHeaders()
      );

      toast.success("Content created successfully!");
      return res.data.content;
    } catch (error) {
      console.error("Failed to create content:", error);
      toast.error("Failed to create content. Please try again later.");
      return null;
    }
  };

  return { createContent };
}
