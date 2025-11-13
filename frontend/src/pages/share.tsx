import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { API_URL } from "../App";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags?: string[];
}

interface SharedData {
  message: string;
  sharedBy: { username: string };
  content: SharedContent[];
}

export default function PublicSharePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [data, setData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchShared = async () => {
    try {
      const res = await axios.get(`${API_URL}/v2/share/${shareId}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shareId) fetchShared();
  }, [shareId]);

  if (loading) return <div className="p-4">Loading shared content...</div>;

  if (!data)
    return (
      <div className="p-4 text-center text-gray-500">
        Shared link not found or expired.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-2">
        Shared by {data.sharedBy.username}
      </h1>
      <p className="text-gray-500 mb-6">{data.content.length} shared links</p>

      <div className="space-y-3">
        {data.content.map((item) => (
          <div
            key={item._id}
            className="border p-3 rounded-md hover:shadow-sm transition"
          >
            <h2 className="text-lg font-medium">{item.title}</h2>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm break-all"
            >
              {item.link}
            </a>

            {item.tags && (
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button
          text="Back"
          onClick={() => window.history.back()}
          variant="Secondary"
          size="md"
        />
      </div>
    </div>
  );
}
