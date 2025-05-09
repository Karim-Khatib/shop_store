"use client";
import React, { useCallback } from "react";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import RegisterFormComponent from "@/app/auth/register/RegisterFormComponent";

export default function CreateUserDialogComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpenChange = useCallback(() => setIsOpen((o) => !o), []);
  const onCreated = useCallback(() => setIsOpen(false), []);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-fit">
          Create User
          <MdOutlinePersonAddAlt1 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edit profile</DialogTitle>
        <RegisterFormComponent isFromAdmin={true} onCreated={onCreated} />
      </DialogContent>
    </Dialog>
  );
}
