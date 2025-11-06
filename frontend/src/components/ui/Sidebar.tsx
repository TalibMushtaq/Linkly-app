import { SidebarItem } from "./SidebarItems";
import { XIcon } from "../../assets/icons/XIcon";
import { YoutubeIcon } from "../../assets/icons/youtubeIcon";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white flex flex-col p-4 ">
      {/* Sidebar Header */}
      <div className="text-xl font-semibold mb-7">Dashboard</div>

      {/* Sidebar Items */}
      <nav className="flex flex-col gap-2">
        <SidebarItem text="YouTube" icon={<YoutubeIcon size="lg" />} />
        <SidebarItem text="X.com" icon={<XIcon size="lg" />} />
      </nav>
    </div>
  );
};
