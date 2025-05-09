"use client";
import React, { useActionState, useCallback, useEffect } from "react";
// import UserProfilePictureComponent from "./UserProfilePictureComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerFormAction } from "@/backend/auth/UserAuth";

import DangerText from "@/components/ui/DangerText";
import { RoutesName } from "@/lib/constant";
import UserProfilePictureComponent from "./UserProfilePictureComponent";
interface RegisterFormData {
  fullName: string;
  email: string;
  birthDay: string;
  password: string;
  confirmPassword: string;
  image?: File;
}
interface RegisterFormProps {
  className?: string;
  isFromAdmin: boolean;
  onCreated?: () => void;
}
export default function RegisterFormComponent({
  className,
  isFromAdmin = false,
  onCreated,
}: RegisterFormProps) {
  const [formData, setFormData] = React.useState<RegisterFormData>({
    fullName: "",
    email: "",
    birthDay: "",
    password: "",
    confirmPassword: "",
    image: undefined,
  });
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "image" ? e.target.files?.item(0) : e.target.value,
      };
    });
  }, []);
  const [state, action, isPending] = useActionState(
    (prevState: unknown, formData: FormData) => {
      return registerFormAction(prevState, formData, isFromAdmin);
    },
    undefined
  );
  useEffect(() => {
    if (state?.success == true && onCreated) {
      onCreated();
    }
  }, [state, onCreated]);

  useEffect(() => {
    setFormData((f) => {
      return {
        ...f,
        image: undefined,
      };
    });
  }, [state]);

  return (
    <form action={action}>
      <div className={`w-full flex flex-col gap-4 ${className}`}>
        <UserProfilePictureComponent
          name="image"
          onChange={onChange}
          value={formData.image}
        />
        <div>
          <Label>Full Name</Label>
          <Input
            onChange={onChange}
            value={formData.fullName}
            type="text"
            name="fullName"
          />
          {state?.errors?.fullName && (
            <DangerText text={state?.errors?.fullName}></DangerText>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            onChange={onChange}
            value={formData.email}
            type="email"
            name="email"
          />
          {state?.errors?.email && (
            <DangerText text={state?.errors.email}></DangerText>
          )}
        </div>
        <div>
          <Label>Birth Day</Label>
          <Input
            onChange={onChange}
            value={formData.birthDay}
            max={new Date().toISOString().split("T")[0]}
            min="1900-01-01"
            type="date"
            name="birthDay"
          />
          {state?.errors?.birthDay && (
            <DangerText text={state?.errors.birthDay}></DangerText>
          )}
        </div>
        <div>
          <Label>Password</Label>

          <Input
            onChange={onChange}
            value={formData.password}
            type="text"
            name="password"
          />

          {state?.errors?.password && (
            <DangerText text={state?.errors.password}></DangerText>
          )}
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input
            onChange={onChange}
            value={formData.confirmPassword}
            type="text"
            name="confirmPassword"
            security={formData.password}
          />
          {state?.errors?.confirmPassword && (
            <DangerText text={state?.errors.confirmPassword}></DangerText>
          )}
        </div>
        {state?.errors?._form && (
          <DangerText text={state?.errors._form}></DangerText>
        )}
        <Button disabled={isPending}>
          {isPending ? "Loading" : isFromAdmin == true ? "Create" : "Register"}
        </Button>
        {isFromAdmin == false && (
          <p className="text-xs mt-0.5">
            Do you have account?
            <a href={RoutesName.LOGIN}>
              <span className="text-blue-600">Login In</span>
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
