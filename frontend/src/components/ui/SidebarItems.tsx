import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
}

export const SidebarItem = ({ text, icon }: SidebarItemProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};
