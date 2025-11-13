import { useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { toast } from "sonner";

export interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags?: string[];
}

export interface FriendShare {
  shareId: string;
  shareUrl: string;
  sharedBy: string;
  content: SharedContent[];
}

export function useSharedContent() {
  const [friendShares, setFriendShares] = useState<FriendShare[]>([]);
  const [loading, setLoading] = useState(false);

  // Extract shareId from various URL formats
  const extractShareId = (url: string): string | null => {
    // Remove whitespace
    const trimmed = url.trim();
    
    // If it's just the shareId (e.g., "abc123")
    if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      return trimmed;
    }
    
    // If it's a full URL (e.g., "http://localhost:5173/share/abc123")
    const match = trimmed.match(/\/share\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return match[1];
    }
    
    // If it's a relative path (e.g., "/share/abc123")
    const relativeMatch = trimmed.match(/share\/([a-zA-Z0-9_-]+)/);
    if (relativeMatch && relativeMatch[1]) {
      return relativeMatch[1];
    }
    
    return null;
  };

  const fetchSharedContent = useCallback(async (shareLink: string) => {
    const shareId = extractShareId(shareLink);
    
    if (!shareId) {
      toast.error("Invalid share link format. Please enter a valid share link.");
      return null;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/v2/share/${shareId}`);
      const data = res.data;
      
      const friendShare: FriendShare = {
        shareId,
        shareUrl: `/share/${shareId}`,
        sharedBy: data.sharedBy?.username || "Unknown",
        content: data.content || [],
      };
      
      // Check if this share is already added
      setFriendShares((prev) => {
        const exists = prev.find((fs) => fs.shareId === shareId);
        if (exists) {
          toast.info("This share link is already added.");
          return prev;
        }
        const updated = [...prev, friendShare];
        // Save to localStorage
        const shareIds = updated.map((fs) => fs.shareId);
        localStorage.setItem("friendShares", JSON.stringify(shareIds));
        return updated;
      });
      
      toast.success(`Added shared content from ${friendShare.sharedBy}`);
      return friendShare;
    } catch (error: any) {
      console.error("Failed to fetch shared content:", error);
      const message = error.response?.data?.message || "Failed to load shared content";
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFriendShare = useCallback((shareId: string) => {
    setFriendShares((prev) => {
      const updated = prev.filter((fs) => fs.shareId !== shareId);
      // Update localStorage
      const shareIds = updated.map((fs) => fs.shareId);
      localStorage.setItem("friendShares", JSON.stringify(shareIds));
      return updated;
    });
    toast.success("Removed shared content");
  }, []);

  // Load saved friend shares from localStorage on mount
  const loadSavedShares = useCallback(async () => {
    const saved = localStorage.getItem("friendShares");
    if (saved) {
      try {
        const shareIds: string[] = JSON.parse(saved);
        // Fetch all saved shares
        const promises = shareIds.map((shareId) =>
          axios.get(`${API_URL}/v2/share/${shareId}`).then((res) => ({
            shareId,
            data: res.data,
          })).catch(() => null)
        );
        const results = await Promise.all(promises);
        
        const loadedShares: FriendShare[] = results
          .filter((result): result is { shareId: string; data: any } => result !== null)
          .map((result) => ({
            shareId: result.shareId,
            shareUrl: `/share/${result.shareId}`,
            sharedBy: result.data.sharedBy?.username || "Unknown",
            content: result.data.content || [],
          }));
        
        setFriendShares(loadedShares);
      } catch (error) {
        console.error("Failed to load saved shares:", error);
      }
    }
  }, []);

  // Save friend shares to localStorage
  const saveShares = useCallback(() => {
    const shareIds = friendShares.map((fs) => fs.shareId);
    localStorage.setItem("friendShares", JSON.stringify(shareIds));
  }, [friendShares]);

  return {
    friendShares,
    loading,
    fetchSharedContent,
    removeFriendShare,
    loadSavedShares,
    saveShares,
  };
}

