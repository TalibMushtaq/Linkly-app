import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { toast } from "sonner";

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags?: string[];
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // Fetch user content
  const fetchContent = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/v1/content`, getAuthHeaders());
      setContents(res.data.content || []);
    } catch (error) {
      console.error("Failed to fetch content:", error);
      toast.error("Failed to load your content.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete content
  const deleteContent = useCallback(async (contentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(
        `${API_URL}/v1/content/${contentId}`,
        getAuthHeaders()
      );
      setContents((prev) => prev.filter((item) => item._id !== contentId));
      toast.success("Content deleted successfully!");
    } catch (err) {
      console.error("Failed to delete content:", err);
      toast.error("Failed to delete content. Try again later.");
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { contents, loading, fetchContent, deleteContent };
}
