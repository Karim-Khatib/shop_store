import React from "react";
import { NavBarData } from "./NavBarData";


import SubNaveListTileComponent from "./SubNaveListTileComponent";
import SearchIconComponent from "./SearchIconComponent";
export default function SideNavComponent({ item }: { item?: NavBarData }) {
  return (
    <div className="w-3xs min-h-screen border-e-2 w-max-3xs w-min-3xs bg-neutral-100 border-neutral-200 h-full">
      <HeaderSideNave item={item} />
      {item?.items?.map((item) => (
        <SubNaveListTileComponent key={item.link || item.title} item={item} />
      ))}
    </div>
  );
}
interface HeaderSideNaveProps {
  item: NavBarData | undefined;
}
const HeaderSideNave = ({ item }: HeaderSideNaveProps) => (
  <div className="ps-4 pt-6 pe-6 h-16  mb-4">
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-lg">{item?.dashboardTitle || "Dashboard"}</h1>
      <SearchIconComponent/>
    </div>
  </div>
);
