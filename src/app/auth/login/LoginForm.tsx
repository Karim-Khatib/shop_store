"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useActionState, useEffect } from "react";

import DangerText from "@/components/ui/DangerText";
import { toast } from "sonner";
import loginViaEmail from "@/backend/auth/UserAuth";
import { RoutesName } from "@/lib/constant";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginViaEmail, {
    success: false,
    message: "",
    errors: undefined,
  });

  useEffect(() => {
    if (state?.success === false && state?.errors?._form) {
      toast(state?.errors?._form, {
        style: {
          background: "#FF5A5F",
          color: "white",
        },
        position: "bottom-center",

        action: {
          label: "Cancel",
          actionButtonStyle: {
            background: "white",
            color: "#FF5A5F",
          },
          onClick: () => {},
        },
      });
    }
    return () => {
      
    };
  }, [state]);

  return (
    <div className="pt-10 w-full">
      <form action={formAction}>
        <Label title="Email">Email</Label>
        <Input key={"email"} className="w-full" type="email" name="email" />

        {state?.errors?.email && <DangerText text={state.errors.email} />}
        <Spacing />
        <Label title="Password">Password</Label>

        <Input className="w-full" type="password" name="password" />
        {state?.errors?.password && <DangerText text={state.errors.password} />}
        <Spacing />
        <Spacing />
        {state?.errors?._form && <DangerText text={state.errors._form} />}
        <Button disabled={isPending}>{isPending ? "Loading" : "Login"}</Button>
        <p className="text-xs mt-0.5">
          Don’t have an account?
          <a href={RoutesName.REGISTER}>
            <span className="text-blue-600">Sign Up</span>
          </a>
        </p>
      </form>
    </div>
  );
}

const Spacing = () => {
  return <div className="h-4"></div>;
};
