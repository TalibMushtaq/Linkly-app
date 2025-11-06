import { useState } from "react";
import { PlusIcon } from "../assets/icons/plusicon";
import { ShareIcon } from "../assets/icons/shareIcon";
import { Button } from "../components/ui/Button";
import { CreateContentForm } from "../components/ui/CreatContentForm";
import { Card } from "../components/ui/Card";
import { Sidebar } from "../components/ui/Sidebar";

export const UserDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Action Bar */}
        <div className="flex justify-end p-10 ">
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
          <Card
            title="The 7 Silent Killers of Success"
            link="https://www.youtube.com/watch?v=l4Sc2QwQ-nc"
            type="youtube"
          />
          <Card
            title="Elon's tweet about AI"
            link="https://x.com/elonmusk/status/1683920951807971329"
            type="X"
          />
        </div>

        {/* Modal/Form */}
        <CreateContentForm isOpen={showForm} onClose={() => setShowForm(false)} />
      </div>
    </div>
  );
};
