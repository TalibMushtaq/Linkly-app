import React, { useState } from "react";
import { ShareIcon } from "../../assets/icons/shareIcon";
import { YoutubeIcon } from "../../assets/icons/youtubeIcon";
import { XIcon } from "../../assets/icons/XIcon";
import { DeleteIcon } from "../../assets/icons/deleteIcon";
import { Tweet } from "react-tweet";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: string;
  onDelete?: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({
  _id,
  title,
  link,
  type,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // --- Extract YouTube video ID ---
  const getYoutubeId = (url: string): string | null => {
    try {
      // Normalize URL by removing angle brackets and trimming spaces
      const cleaned = url.trim().replace(/[<>]/g, "");

      // This regex covers ALL YouTube formats
      const match = cleaned.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^"&?\/\s]{11})/
      );

      if (match && match[1]) {
        return match[1];
      }

      return null;
    } catch (error) {
      console.error("Error extracting YouTube ID:", error);
      return null;
    }
  };

  // --- Extract Tweet ID ---
  const getTweetId = (url: string): string | null => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  // --- Copy link handler ---
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying link:", err);
    }
  };

  // --- Render Media ---
  const renderMedia = () => {
    if (type === "youtube") {
      const videoId = getYoutubeId(link);
      if (!videoId)
        return <p className="text-gray-500 text-sm">Invalid YouTube link</p>;

      return (
        <iframe
          className="w-full aspect-video rounded-lg mt-3"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (type === "X") {
      const tweetId = getTweetId(link);
      if (!tweetId)
        return <p className="text-gray-500 text-sm">Invalid Tweet link</p>;

      const collapsedHeight = 315;

      return (
        <div className="relative mt-3">
          <div
            className={`overflow-hidden transition-all duration-300 rounded-lg`}
            style={{
              maxHeight: expanded ? "800px" : `${collapsedHeight}px`,
            }}
          >
            <div className="tweet-container [&_iframe]:border-none [&_iframe]:outline-none">
              <Tweet id={tweetId} />
            </div>

            {!expanded && (
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/90 to-transparent flex justify-center items-end pb-2 backdrop-blur-sm">
                <button
                  onClick={() => setExpanded(true)}
                  className="text-black text-sm font-semibold hover:underline"
                >
                  Show more ↓
                </button>
              </div>
            )}
          </div>

          {expanded && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setExpanded(false)}
                className="text-black text-sm font-semibold hover:underline"
              >
                Show less ↑
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <p className="text-gray-500 text-sm text-center mt-3">
        Unsupported link type
      </p>
    );
  };

  // --- Platform link ---
  const platformLink =
    type === "youtube" ? "https://www.youtube.com" : "https://x.com";

  return (
    <div className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-[340px]">
      <div className="flex justify-between items-center">
        {/* Left side — icon and title */}
        <div className="flex items-center space-x-3 text-sm font-bold text-gray-800">
          <a
            href={platformLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80 transition"
            title={type === "youtube" ? "Open YouTube" : "Open X"}
          >
            {type === "youtube" ? (
              <YoutubeIcon size="lg" />
            ) : (
              <XIcon size="lg" />
            )}
          </a>
          <span>{title}</span>
        </div>

        {/* Right side — actions */}
        <div className="flex items-center space-x-2">
          {/* Copy link */}
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-md transition"
            title="Copy link"
          >
            <ShareIcon size="md" />
          </button>

          {copied && (
            <span className="text-xs text-green-600 font-medium">Copied!</span>
          )}

          {/* Delete */}
          <button
            onClick={() => onDelete?.(_id)}
            className="p-2 hover:bg-gray-100 rounded-md transition text-red-500"
            title="Delete content"
          >
            <DeleteIcon size="md" />
          </button>
        </div>
      </div>

      {/* Embedded Media */}
      <div className="pt-4">{renderMedia()}</div>
    </div>
  );
};
