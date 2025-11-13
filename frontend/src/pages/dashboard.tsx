import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../assets/icons/plusicon";
import { ShareIcon } from "../assets/icons/shareIcon";
import { Button } from "../components/ui/Button";
import { CreateContentForm } from "../components/ui/CreatContentForm";
import { Card } from "../components/ui/Card";
import { Sidebar } from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import type { Content } from "../hooks/useContent";
import { useCreateContent } from "../hooks/useCreateContent";
import { useSharedContent } from "../hooks/useSharedContent";
import { DeleteIcon } from "../assets/icons/deleteIcon";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [shareLinkInput, setShareLinkInput] = useState("");
  const [showShareInput, setShowShareInput] = useState(false);

  const { contents, loading, deleteContent } = useContent();
  const { createContent } = useCreateContent();
  const {
    friendShares,
    loading: loadingShares,
    fetchSharedContent,
    removeFriendShare,
    loadSavedShares,
  } = useSharedContent();

  useEffect(() => {
    loadSavedShares();
  }, [loadSavedShares]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  async function handleCreate(data: Record<string, string>) {
    const newItem = await createContent(data);
    if (newItem) setShowForm(false);
  }

  async function handleAddShareLink() {
    if (!shareLinkInput.trim()) {
      return;
    }
    await fetchSharedContent(shareLinkInput);
    setShareLinkInput("");
    setShowShareInput(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar + Logout */}
      <div className="shadow-lg flex flex-col justify-between items-center p-4 w-64 bg-white">
        <Sidebar />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full text-red-600 border border-red-500 hover:bg-red-50 active:bg-red-100 font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out"
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center p-10">
          {/* Add Friend Share Link Section */}
          <div className="flex items-center gap-2">
            {!showShareInput ? (
              <Button
                variant="Secondary"
                size="md"
                text="Add friend's share link"
                onClick={() => setShowShareInput(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter share link (e.g., /share/abc123)"
                  value={shareLinkInput}
                  onChange={(e) => setShareLinkInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddShareLink()}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 min-w-[300px]"
                />
                <Button
                  variant="Primary"
                  size="md"
                  text="Add"
                  onClick={handleAddShareLink}
                />
                <button
                  onClick={() => {
                    setShowShareInput(false);
                    setShareLinkInput("");
                  }}
                  className="text-gray-500 hover:text-gray-700 px-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {/* Add Content Button */}
            <Button
              variant="Primary"
              size="lg"
              text="Add content"
              startIcon={<PlusIcon size="lg" />}
              onClick={() => setShowForm(true)}
            />

            {/* Share Links Button */}
            <Button
              variant="Secondary"
              size="lg"
              text="Share links"
              startIcon={<ShareIcon size="lg" />}
              onClick={() => navigate("/shared")}
            />
          </div>
        </div>

        {/* Friend's Shared Content */}
        {friendShares.length > 0 && (
          <div className="px-10 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Friends' Shared Content
            </h2>
            {friendShares.map((friendShare) => (
              <div key={friendShare.shareId} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    Shared by {friendShare.sharedBy}
                  </h3>
                  <button
                    onClick={() => removeFriendShare(friendShare.shareId)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                    title="Remove this friend's share"
                  >
                    <DeleteIcon size="sm" />
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {loadingShares ? (
                    <p className="text-gray-500">Loading...</p>
                  ) : friendShare.content.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No content shared yet.
                    </p>
                  ) : (
                    friendShare.content.map((item) => (
                      <Card
                        key={item._id}
                        _id={item._id}
                        title={item.title}
                        link={item.link}
                        type={item.type || "youtube"}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Your Content */}
        <div className="px-10 pb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Content
          </h2>
          <div className="flex flex-wrap gap-4">
            {loading ? (
              <p className="text-gray-500 text-lg">Loading content...</p>
            ) : contents.length === 0 ? (
              <p className="text-gray-500 text-lg">No content yet. Add one!</p>
            ) : (
              contents.map((item: Content) => (
                <Card
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type || "youtube"}
                  onDelete={deleteContent}
                />
              ))
            )}
          </div>
        </div>

        {/* Modal/Form */}
        <CreateContentForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
};
