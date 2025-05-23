import type { Metadata } from "next";
import person from "@/assets/person.svg";
import gift from "@/assets/gift.svg";
import NavBarComponent from "@/navbar/NavBarComponent";
import { RoutesName } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <NavBarComponent 
        item={{
          dashboardTitle: "Dashboard",
          items: [
            {
              title: "Users",
              link: RoutesName.USERS,
              icon: person,
            },
            {
              title: "Gift",
              link: RoutesName.GIFTS,
              icon: gift,
            },
          ],
        }}
      />
      

      {children}

    </div>
  );
}
