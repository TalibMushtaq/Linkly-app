import { SidebarItem } from "./SidebarItems";
import { XIcon } from "../../assets/icons/XIcon";
import { YoutubeIcon } from "../../assets/icons/youtubeIcon";
import { HeroIcon } from "../../assets/icons/heroIcon";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white flex flex-col p-5">
      {/* Sidebar Header */}
      <div className="text-4xl font-semibold mb-7 flex items-center gap-3">
        < HeroIcon className="text-purple-700" size="xl"/>
        <span>linkly</span>
      </div>

      {/* Sidebar Items */}
      <nav className="flex flex-col gap-2 px-3">
        <SidebarItem text="YouTube" icon={<YoutubeIcon size="lg" />} />
        <SidebarItem text="X.com" icon={<XIcon size="lg" />} />
      </nav>
    </div>
  );
};
