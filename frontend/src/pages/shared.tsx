import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";
import { API_URL } from "../App";

interface ShareResponse {
  shared: boolean;
  shareId: string | null;
  shareUrl: string | null;
}

export default function SharedPage() {
  const [share, setShare] = useState<ShareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const PUBLIC_BASE = window.location.origin;

  const fetchShare = async () => {
    try {
      const res = await axios.get(`${API_URL}/shares`, {
        withCredentials: true,
      });
      setShare(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch share link");
    } finally {
      setLoading(false);
    }
  };

  const createShare = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/share`,
        {},
        { withCredentials: true }
      );
      toast.success("Share link created");
      setShare({
        shared: true,
        shareId: res.data.shareId,
        shareUrl: res.data.shareUrl,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create share link");
    }
  };

  const deleteShare = async () => {
    try {
      await axios.delete(`${API_URL}/share`, { withCredentials: true });
      toast.success("Share link removed");
      setShare({ shared: false, shareId: null, shareUrl: null });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete share link");
    }
  };

  useEffect(() => {
    fetchShare();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-semibold mb-4">Your Shared Link</h1>

      {share?.shared && share.shareId ? (
        <div className="space-y-4">
          <div className="p-3 border rounded-md bg-gray-50">
            <p className="text-sm mb-1 text-gray-600">Public Share URL:</p>
            <code className="break-all text-blue-600">
              {`${PUBLIC_BASE}${share.shareUrl}`}
            </code>
          </div>

          <div className="flex gap-3">
            <Button
              text="Copy Link"
              onClick={async () =>
                navigator.clipboard.writeText(`${PUBLIC_BASE}${share.shareUrl}`)
              }
              variant="Secondary"
              size="md"
            />
            <Button
              text="Delete Link"
              onClick={deleteShare}
              variant="Secondary"
              size="md"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-600">
            You don’t have a public share link yet.
          </p>
          <Button
            text="Create Share Link"
            onClick={createShare}
            variant="Primary"
            size="md"
          />
        </div>
      )}
    </div>
  );
}
