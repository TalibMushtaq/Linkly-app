import React, { useState } from "react";
import { ShareIcon } from "../../assets/icons/shareIcon";
import { YoutubeIcon } from "../../assets/icons/youtubeIcon";
import { XIcon } from "../../assets/icons/XIcon";
import { DeleteIcon } from "../../assets/icons/deleteIcon";
import { Tweet } from "react-tweet";

interface CardProps {
  title: string;
  link: string;
  type: "X" | "youtube";
}

export const Card: React.FC<CardProps> = ({ title, link, type }) => {
  const [copied, setCopied] = useState(false);

  // --- Extract YouTube video ID ---
  const getYoutubeId = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
      if (parsed.hostname.includes("youtube.com"))
        return parsed.searchParams.get("v");
    } catch {
      return null;
    }
    return null;
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
      console.error("Error while copying link to clipboard:", err);
    }
  };

  // --- Render Media ---
  const renderMedia = () => {
    if (type === "youtube") {
      const videoId = getYoutubeId(link);
      if (!videoId)
        return (
          <p className="text-gray-500 text-sm">Invalid YouTube link</p>
        );

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

      return (
        <div className="mt-3">
          <Tweet id={tweetId} />
        </div>
      );
    }

    return (
      <p className="text-gray-500 text-sm text-center mt-3">
        Unsupported link type
      </p>
    );
  };

  // --- Platform Link ---
  const platformLink =
    type === "youtube" ? "https://www.youtube.com" : "https://x.com";

  return (
    <div className="p-4 bg-snow rounded-md border border-gray-200 max-w-82">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-sm font-bold">
          {/* 🔗 Clickable platform icon */}
          <a
            href={platformLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80 transition"
            title={type === "youtube" ? "Open YouTube" : "Open X"}
          >
            {type === "youtube" ? (
              <YoutubeIcon size="md" />
            ) : (
              <XIcon size="md" />
            )}
          </a>
          <span>{title}</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* 🖱 Copy link button */}
          <button
            onClick={handleCopy}
            className="flex p-2 hover:opacity-80 transition cursor-pointer"
            title="Copy Link"
          >
            <ShareIcon size="md" />
          </button>

          {copied && (
            <span className="text-xs text-green-600 font-medium ml-1">
              Copied!
            </span>
          )}

          {/* 🗑 Delete button */}
          <button
            className="flex p-2 hover:opacity-80 transition cursor-pointer"
            title="Delete Link"
          >
            <DeleteIcon size="md" />
          </button>
        </div>
      </div>

      <div className="py-4">{renderMedia()}</div>
    </div>
  );
};
