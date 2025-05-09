import React from "react";
import { NavBarData } from "./NavBarData";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import logo from "../assets/logo.png";

import { headers } from "next/headers";
import NavBarListTileComponent from "./NavBarListTileComponent";
import LogOutButton from "./LogOutButton";
import UserEmailText from "./UserEmailText";

// import { headers } from "next/headers";
export default async function NavBarComponent({ item }: { item?: NavBarData }) {
  return (
    <div className="flex-none  flex flex-col w-max-3xs w-min-3xs w-3xs  bg-white-200 shadow-lg flex-shrink-0">
      {header(item)}
      {divider}
      <div className="flex-1 w-full overflow-y-auto ps-3.5 pe-4 pt-4 pb-4">
        {item?.items?.map((item) => (
          <NavBarListTileComponent item={item} key={item.link} />
        ))}
      </div>
      {divider}
      <div className="h-20 w-full flex flex-row items-center justify-between space-x-0.5">
        <UserEmailText />
        <LogOutButton />
      </div>
    </div>
  );
}

const divider = <hr className="border[#EAEAEF]" />;
// header Nav Bar ===================================================
const header = (item: NavBarData | undefined): React.JSX.Element => {
  if (item?.dashboardTitle === undefined) {
    return <div></div>;
  }
  return (
    <div className="h-20 w-full p-6 ">
      <div className="flex flex-row">
        <Avatar>
          <AvatarImage src={logo.src} width={32} height={32}></AvatarImage>
        </Avatar>
        <div className="flex flex-col ms-2">
          <span className="text-sm text-[14px] text-[#32324D]">
            {item?.dashboardTitle || "Seventy"}
          </span>
          <span className="text-xs text-[12px] text-[#666687]">Dashboard</span>
        </div>
      </div>
    </div>
  );
};

export async function getCurrentPathName(): Promise<string> {
  const headersList = headers();
  const fullUrl = (await headersList).get("referer") || "";
  const pathName = new URL(fullUrl || "").pathname;

  return pathName;
}
