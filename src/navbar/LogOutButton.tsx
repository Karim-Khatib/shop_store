"use client";
import { Logout } from "@/backend/auth/UserAuth";
import { Button } from "@/components/ui/button";
import { MdExitToApp } from "react-icons/md";

export default function LogOutButton() {
  return (
    <Button
      variant={"outline"}
      key={"logout"}
      className="w-2.5 pointer-coarse: m-3"
      onClick={Logout}
    >
      <MdExitToApp />
    </Button>
  );
}
