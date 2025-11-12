import { useState } from "react";
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

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const { contents, loading, deleteContent } = useContent();
  const { createContent } = useCreateContent();

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
        <div className="flex justify-end p-10">
          <div className="flex gap-2">
            <Button
              variant="Primary"
              size="lg"
              text="Add content"
              startIcon={<PlusIcon size="lg" />}
              onClick={() => setShowForm(true)}
            />
            <Button
              variant="Secondary"
              size="lg"
              text="Share links"
              startIcon={<ShareIcon size="lg" />}
              onClick={() => console.log("Share clicked")}
            />
          </div>
        </div>

        {/* Content Cards */}
        <div className="flex flex-wrap gap-4 p-10">
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
